const leadService = require('../services/leadService');

const createLead = async (req, res) => {
  try {
    const userid = req.user.userid; // fetched from auth middleware
    const lead = await leadService.createLeadWithAction(req.body, userid);
    res.status(201).json({ message: 'lead created successfully', lead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLeadsWithLastUpdatedBy = async (req, res) => {
  try {
    const leads = await leadService.getLeadsWithLastUpdatedBy();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const userid = req.user.userid;
    const leadid = parseInt(req.params.leadid, 10);
    const updatedLead = await leadService.updateLeadWithAction(leadid, req.body, userid);
    res.json({ message: 'lead updated successfully', lead: updatedLead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const userid = req.user.userid;
    const leadid = parseInt(req.params.leadid, 10);
    const deletedLead = await leadService.deleteLeadWithAction(leadid, userid);
    res.json({ message: 'lead deleted successfully', lead: deletedLead });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLeadActionsWithUser = async (req, res) => {
  try {
    const { leadid } = req.query;
    const actions = await leadService.getLeadActionsWithUser(leadid);
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLead,
  getLeadsWithLastUpdatedBy,
  updateLead,
  deleteLead,
  getLeadActionsWithUser,
}; 