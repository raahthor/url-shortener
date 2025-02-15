import User from "./users.model.js";
import URL from "./urls.model.js";
import { sequelize } from "../DB/database.js";
import { connectDB } from "../DB/database.js";

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Synced successfully");
  } catch (err) {
    console.err("Not synced: ", err.message);
  }
};

const startDB = async () => {
  try {
    await connectDB();
    await syncDB();
    console.log("Database Connected");
  } catch (error) {
    console.error("DB not connected");
  }
};

export { sequelize, syncDB, startDB, User, URL };
