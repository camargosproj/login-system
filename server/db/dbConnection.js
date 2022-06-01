const mysql = require("mysql");
const {connetionString} = require("../config/envConfig");


const initConnection = () => {
    const db = mysql.createConnection(connetionString);
    db.connect((err) => {
        if (err) throw err;
        console.log("Connected to MYSQL!");
    });
    return db;
}

const db = initConnection();


const getUser = (username) => {
    // Get user from database
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE username = ?",[username],(err, result) => {
           if (err){
                reject(err);
           }
           if (result.length > 0) {
               // Assign the result to a variable
               const user = result[0];
               resolve(user);
           }else{
               console.log("User not found!");
               resolve(result);           
           }
       });
    });
}

const addUser = async (username, password) => {
      // Insert the user into the database
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, password],
            (err, result) => {
              if (err) {
                  reject(err);
              }else{
                  console.log(`User ${username} was added successfully!`);
                  resolve(result);
              }
            }
        );
    })
}



module.exports = {
    db,
    getUser,
    addUser
};
