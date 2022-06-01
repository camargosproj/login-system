const {verifyAuth} = require("./middlewares/verifyAuth");
const {authRouter} = require("./routes/authRoute");
const { errorHandler } = require("./middlewares/errorHandler");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { blogRoute } = require("./routes/blogRoute");


const app = express();

// Built-in middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));




// Routes
app.use(authRouter);


app.use(verifyAuth);
app.use(blogRoute);

app.get("*", (req, res) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});


app.get('/checkUser', (req, res) => {
  res.json({
      message: "User is authenticated"
  })
});

// Error handling
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });