const jwt = require("jsonwebtoken");

// Use a strong secret key and store it in environment variables for security
const secret = process.env.JWT_SECRET || "your-very-secure-secret";
function setUser(user) {
  return jwt.sign(
    {
        _id: user._id, 
        email: user.email
    }, secret); 
}
function getUser(token) {
  if (!token) return null;
  try{
    return jwt.verify(token, secret);
  } 
  catch (err){
    console.error("JWT verification failed:", err.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
