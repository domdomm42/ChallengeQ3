import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import issuesRoute from "./routes/issuesRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/issues", issuesRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
