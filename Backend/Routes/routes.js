import express from "express";
import validator from "validator";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import storeUrl from "../Controllers/storeUrl.js";
import URL from "../Models/urls.model.js";
import User from "../Models/users.model.js";
import storeUser from "../Controllers/storeUser.js";
// import authenticator from "../Controllers/authenticator.js";

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
        // const token = jwt.sign(
        //   { username },
        //   process.env.JWT_SECRET || "dib2637f3c4st23c2y34",
        //   {
        //     expiresIn: "1h",
        //   }
        // );
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "strict",
        // });
        let statsArr = [];
        try {
          statsArr = await URL.findAll({ where: { username } });
        } catch (err) {
          console.error("user stats error: ", err.message);
        }

        return res.json({
          success: true,
          userStats: statsArr,
          username: userEntry.username,
          name: userEntry.name,
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

// router.get("/checkAuth", async (req, res) => {
//   const token = req.cookies.token;

//   if (!token)
//     return res.json({ success: false, message: "Unauthorized, Login again !" });
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET || "dib2637f3c4st23c2y34"
//     );
//     return res.json({ success: true, message: "Authorized", user: decoded });
//   } catch (error) {
//     console.error("middleware error", error.message);
//   }
// });

router.post("/api/generateURL", async (req, res) => {
  const orgUrl = req.body.longUrl;

  const username = req.body.username || null;

  if (!validator.isURL(orgUrl)) {
    return res.json({
      success: false,
      message: "Invalid URL, Go back and try again",
    });
  }
  const urlCode=nanoid(6);
  const shortUrlGen=`${process.env.BASE_URL}/${urlCode}`
  await storeUrl(orgUrl, shortUrlGen, username);

  res.json({
    success: true,
    message: "URL generated successfully",
    shortUrl: shortUrlGen,
  });
});

// router.get("/logout", (req, res) => {
//   const token = req.cookies.token;
//   res.clearCookie("token", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//   });
//   res.json({ message: "Logged out succesfully" });
// });

router.get("/:shortID", async (req, res) => {
  try {
    const shortUrl = req.params.shortID;
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
