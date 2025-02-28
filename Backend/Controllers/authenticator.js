import jwt from "jsonwebtoken";

export default function authenticator(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res.json({
      success: false,
      message: "Yor are not Autherized, Login again!",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    res.json({
      success: false,
      message: "Invalid Token!",
    });
  }
}
