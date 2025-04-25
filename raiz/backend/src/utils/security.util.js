const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },

  comparePassword: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },

  generateJWT: (userId) => {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  },

  generateToken: () => {
    return crypto.randomBytes(20).toString('hex');
  }
};