const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
  userid: { type: Number, unique: true }, // auto-incremented primary key
  username: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_type: { type: String, required: true, default: 'default' },
  user_status: { type: String, required: true, default: 'active' },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  active: { type: Number, default: 1 },
  archieve: { type: Number, default: 0 },
});

UserSchema.plugin(AutoIncrement, { inc_field: 'userid' });

module.exports = mongoose.model('User', UserSchema); 