import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ sucess: false, message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ sucess: false, message: "Unauthorized - invalid token" });
    }

    req.userID = decoded.userID;
    next();
  } catch (error) {
    console.log("Error in verify token", error);
    res.status(500).json({ sucess: false, message: "server error" });
  }
};
