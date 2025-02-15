import bcrypt from "bcryptjs";
import User from "../Models/users.model.js";

async function storeUser(name, username, inputPass) {
  try {
    const salt = await bcrypt.genSalt(1);
    const password = await bcrypt.hash(inputPass, salt);
    User.create({ name, username, password });
  } catch (err) {
    console.error(err.message);
  }
}

export default storeUser;
