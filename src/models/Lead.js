const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const LeadSchema = new mongoose.Schema({
  leadid: { type: Number, unique: true }, // auto-incremented primary key
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  source: { type: String, required: true },
  notes: { type: String },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  active: { type: Number, default: 1 },
  archieve: { type: Number, default: 0 },
});

LeadSchema.plugin(AutoIncrement, { inc_field: 'leadid' });

module.exports = mongoose.model('Lead', LeadSchema); 