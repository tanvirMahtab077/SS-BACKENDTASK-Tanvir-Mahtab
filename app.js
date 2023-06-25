const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const intexRouter = require("./routes/index");
const app = express();

dotenv.config();

// mongodb database connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app is connetted on port: ${process.env.PORT} `);
    });
    console.log("DB connected successfully");
  })
  .catch((err) => console.log(err));

// adding middleware
app.use(cookieParser());
app.use(express.json());
app.use("/api", intexRouter);
