/* Token se check krenge hum whether the admin is valid or not  (jwt.verify(token,secretkey))
token will come in header
token will generated at the time of signin
*/
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
//the beauty of using jwt is it bwibng stateless
// we are not needing to check with the server database to validate the username
// it is saving us a DB call (as in previous folder approach)
// with jwt we are able to check in memory
const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];
  const decoded = jwt.verify(jwtToken, secretKey);
  const decodedUsername = decoded.username;
  if (decodedUsername) next();
  else res.status(401).json({ message: "unauthorized user" });
  
}


module.exports = adminMiddleware;
