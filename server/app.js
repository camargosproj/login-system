const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const {connetionString, jwtSecret} = require("./envConfig");

const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));


const db = mysql.createConnection(connetionString);
  
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MYSQL!");
});


const checkUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "Invalid Token",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "No token provided",
      });
    }
  }

app.get('/checkUser', checkUser, (req, res) => {
    res.json({
        message: "User is authenticated"
    })
})

// Routes
app.post("/register", (req, res) => {
    // Get data from request
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Insert the user into the database
    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
          if (err) {
            if (err.sqlState === "23000") {
              return res.status(403).json("Username already exists, please try another one.");
            }
            return res.status(500).json("Something went wrong, please try again.");
          }
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
            
        }
    );
});

app.post("/login", (req, res) => {
    // Get data from request
    const { username, password } = req.body;

    // Get user from database
    db.query(
        "SELECT * FROM users WHERE username = ?",[username],(err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                // Assign the result to a variable
                const user = result[0];

                // Check if password is correct
                const passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                );

                // If password is not valid, return 401
                if (!passwordIsValid) {
                    return res.status(401).json("Wrong password!");
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
        }
    );
})


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });