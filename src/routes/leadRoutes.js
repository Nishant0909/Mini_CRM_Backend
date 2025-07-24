const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');

// Create lead (protected)
router.post('/createlead', auth, leadController.createLead);
// Get leads with last updated by info (protected)
router.get('/getleadDetails', auth, leadController.getLeadsWithLastUpdatedBy);
// Update lead (protected, now POST)
router.put('/updatelead/:leadid', auth, leadController.updateLead);
// Delete (archive) lead (protected, POST)
router.delete('/deletelead/:leadid', auth, leadController.deleteLead);
// Get all lead actions with user info (protected)
router.get('/getleadactions', auth, leadController.getLeadActionsWithUser);

module.exports = router; 