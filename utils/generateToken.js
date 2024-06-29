import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const token = jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_SECRET
  );
  return token;
};

export default generateToken;
