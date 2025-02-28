import express from "express";
import validator from "validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import storeUrl from "../Controllers/storeUrl.js";
import URL from "../Models/urls.model.js";
import User from "../Models/users.model.js";
import storeUser from "../Controllers/storeUser.js";
import authenticator from "../Controllers/authenticator.js";
import jwt from "jsonwebtoken";

const router = express.Router();
dotenv.config();

router.get("/api", (req, res) => {
  res.send("hello");
});

router.post("/api/createUser", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const inputPassword = req.body.password;

  try {
    const userEntry = await User.findOne({ where: { username } });
    if (!userEntry) {
      await storeUser(name, username, inputPassword);
      return res.json({
        success: true,
        message: "Accout Created, Go back to login.",
      });
    }
    res.json({ success: false, message: "Username already in use" });
  } catch (err) {
    console.error("error findin user in DB :", err.message);
  }
});

router.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const userEntry = await User.findOne({ where: { username } });
    if (userEntry) {
      const isPassword = await bcrypt.compare(password, userEntry.password);
      if (isPassword) {
        //generating jwt token for authentication
        const token = jwt.sign(
          { username: userEntry.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        return res.json({
          success: true,
          message: "Logged In Successfully.",
        });
      } else {
        return res.json({
          success: false,
          message: "Incorrect Password ! Try Again.",
        });
      }
    }
    res.json({
      success: false,
      message: "User doesn't exist !",
    });
  } catch (err) {
    console.error("login error : ", err.message);
  }
});

router.get("/api/checkAuthorization", authenticator, async (req, res) => {
  const username = req.username;

  let statsArr = [];
  let userData = {};

  // send data again here
  try {
    statsArr = await URL.findAll({ where: { username } });
    userData = await User.findOne({ where: { username } });
  } catch (err) {
    console.error("user stats error: ", err.message);
    return res.json({
      success: false,
      message: "Something went wrong, Try Again!",
    });
  }

  return res.json({
    success: true,
    userStats: statsArr,
    username: userData.username,
    name: userData.name,
    message: "Authorized In Successfully.",
  });
});

router.post("/api/generateURL", async (req, res) => {
  const orgUrl = req.body.longUrl;

  const username = req.body.username || null;

  if (!validator.isURL(orgUrl)) {
    return res.json({
      success: false,
      message: "Invalid URL, Go back and try again",
    });
  }
  const urlCode = nanoid(6);
  const shortUrlGen = `${process.env.BASE_URL}/${urlCode}`;
  await storeUrl(orgUrl, shortUrlGen, username);

  res.json({
    success: true,
    message: "URL generated successfully",
    shortUrl: shortUrlGen,
  });
});

router.post("/api/logout", (req, res) => {
  
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ isLoggedOut: true, message: "Logged out succesfully" });
});

router.get("/:shortID", async (req, res) => {
  try {
    const shortUrl = `${process.env.BASE_URL}/${req.params.shortID}`;
    const urlEntry = await URL.findOne({ where: { shortUrl } });
    if (!urlEntry) {
      return res.status(400).json({ error: "URL not found" });
    }
    await urlEntry.increment("clicks");
    res.redirect(urlEntry.originalUrl);
  } catch (err) {
    res.status(500).json("database error", "details: ", err.message);
  }
});

export default router;
