const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const validateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userService.validateUser(username, password);
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    // Set JWT in cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000 // 1 hour
    });
    // Return user data and success message (do not include token in body)
    console.log('Sending login response:', { message: 'login successful', user: result.user });
    res.status(200).json({ message: 'login successful', user: result.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'logout successful' });
};


module.exports = {
  registerUser,
  validateUser,
  logoutUser
}; 