const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserLeadActionSchema = new mongoose.Schema({
  user_lead_action_id: { type: Number, unique: true }, // auto-incremented primary key
  userid: { type: Number, required: true },
  leadid: { type: Number, required: true },
  oldvalue: { type: String, required: true },
  updatedvalue: { type: String, required: true },
  valuetype: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  active: { type: Number, default: 1 },
  archieve: { type: Number, default: 0 },
});

UserLeadActionSchema.plugin(AutoIncrement, { inc_field: 'user_lead_action_id' });

module.exports = mongoose.model('UserLeadAction', UserLeadActionSchema); 