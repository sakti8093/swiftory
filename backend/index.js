const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authrouter = require("./routes/authrouter");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  console.log("welcome to swiftroy backend");
});

app.use(authrouter);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`server running at http://localhost:${process.env.PORT}`)
    )
    .catch((error) => console.log(error));
});
