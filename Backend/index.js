import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { startDB } from "./Models/syncModels.js";
import router from "./Routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(cookieParser());

await startDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Server running on port", port);
  }
});
