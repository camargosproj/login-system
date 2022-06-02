
const errorHandler = (err, req , res, next) => {
    if (err?.sqlState === "23000") {
      return res.status(403).json({message : "Username already exists, please try another one."});
    }else if(err?.status === 404){
      return res.status(404).json({ message : "User not found!"});
    }else if(err?.status === 400){
      return res.status(400).json({ message : "Please provide username and password!"});
    } 
    return res.status(500).json({ message : "Something went wrong, please try again!"});
}

module.exports = {
    errorHandler
};