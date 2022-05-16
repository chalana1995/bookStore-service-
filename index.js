const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRouter = require("./routes/book-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", bookRouter);

mongoose
  .connect(process.env.MONGODB_TOKEN)
  .then(() => console.log("Connected to the database"))
  .then(() => app.listen(5000))
  .catch((err) => {
    console.log(err);
  });
