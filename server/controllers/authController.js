const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {jwtSecret} = require("../config/envConfig");
const {getUser, addUser} = require("../db/dbConnection");

const saltRounds = 10;




const userLogin = async (req, res, next) => {
    // Get data from request
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(404).json({status: 404, message : "Please provide username and password!"});
    }

    // Get the user from the database
    try{
        const user = await getUser(username);
        if (user) {
            // Assign the result to a variable
            //const user = result[0];
    
            // Check if password is correct
            const passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );
    
            // If password is not valid, return 401
            if (!passwordIsValid) {
                return res.status(400).json({message : "Wrong password!"});
            }              
            
            // If everything is ok, create a token and send it back
            const token = jwt.sign({ id: user.id }, jwtSecret, {
              expiresIn: "1h",
            })
            //req.session.userId = user.id;
            res.status(200).json({ 
              isAuthorized: true,
              token: token 
            });
        } else {
            res.status(401).json({
              isAuthorized: false,
              message: "User not found!"
            });
        }
    }catch(err){
        next(err);
    }
}

const userRegister =  (req, res, next) => {
    // Get data from request
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(404).json({status: 404, message : "Please provide username and password!"});
    }
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Insert the user into the database
    addUser(username, hashedPassword)
        .then((result) => {
            // Assign the result to a variable
            const id = result.insertId;

            // If everything is ok, create a token and send it back
            const token = jwt.sign({ id: id }, jwtSecret, {
              expiresIn: "1h",
            })
            //req.session.userId = user.id;
            res.status(200).json({ 
              message: "User registered successfully",
              isAuthorized: true,
              token: token 
            });
        })
        .catch((err) => {
            next(err);
        });
};


module.exports = {
    userLogin,
    userRegister
}