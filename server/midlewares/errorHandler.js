
const errorHandler = (err, req , res, next) => {
    if (err?.sqlState === "23000") {
      return res.status(403).json("Username already exists, please try another one.");
    }
    return res.status(500).json("Something went wrong, please try again.");
}

module.exports = {
    errorHandler
};