const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  return await user.save();
};

const validateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  // Generate JWT
  const token = jwt.sign(
    { userid: user.userid, username: user.username, user_type: user.user_type },
    process.env.JWT_SECRET || 'defaultsecret',
    { expiresIn: '1h' }
  );
  return { user, token };
};

module.exports = {
  createUser,
  validateUser,
  // ...other service functions
}; 