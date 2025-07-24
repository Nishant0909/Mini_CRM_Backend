const Lead = require('../models/Lead');
const UserLeadAction = require('../models/UserLeadAction');
const User = require('../models/User');

const createLeadWithAction = async (leadData, userid) => {
  // Create the lead
  const lead = new Lead(leadData);
  const savedLead = await lead.save();

  // Create the user-lead action
  const userLeadAction = new UserLeadAction({
    userid: userid,
    leadid: savedLead.leadid,
    oldvalue: '-',
    updatedvalue: savedLead.status,
    valuetype:  'status',
    created_date: new Date(),
    updated_date: new Date(),
    active: 1,
    archieve: 0
  });
  await userLeadAction.save();

  return savedLead;
};

const getLeadsWithLastUpdatedBy = async () => {
  // Aggregate to get the last UserLeadAction for each lead
  const actions = await UserLeadAction.aggregate([
    { $sort: { updated_date: -1 } },
    { $group: { _id: "$leadid", lastAction: { $first: "$$ROOT" } } }
  ]);

  // Map of leadid to last action
  const leadIdToAction = {};
  actions.forEach(a => { leadIdToAction[a._id] = a.lastAction; });
  console.log(leadIdToAction);
  // Get all leads
  const leads = await Lead.find({archieve: 0,active: 1});
  console.log(leads);
  // Get all userids from actions
  const userIds = actions.map(a => a.lastAction.userid);
  console.log(userIds);
  const users = await User.find({ userid: { $in: userIds },active: 1,archieve: 0 });
  console.log(users);
  const userIdToUser = {};
  users.forEach(u => { userIdToUser[u.userid] = u; });
  console.log(users);
  // Combine
  return leads.map(lead => {
    const action = leadIdToAction[lead.leadid];
    const user = action ? userIdToUser[action.userid] : null;
    return {
      ...lead.toObject(),
      last_updated_by_first_name: user ? user.first_name : null,
      last_updated_by_last_name: user ? user.last_name : null,
    };
  });
};

const updateLeadWithAction = async (leadid, updateData, userid) => {
  // Find the existing lead
  const lead = await Lead.findOne({ leadid });
  if (!lead) throw new Error('Lead not found');

  // Track changes for UserLeadAction
  let changedFields = [];
  for (const key in updateData) {
    if (lead[key] !== undefined && lead[key] !== updateData[key]) {
      changedFields.push({
        valuetype: key,
        oldvalue: lead[key],
        updatedvalue: updateData[key],
      });
    }
  }

  // Update the lead
  Object.assign(lead, updateData, { updated_date: new Date() });
  await lead.save();

  // For each changed field, create a UserLeadAction
  for (const field of changedFields) {
    await new UserLeadAction({
      userid,
      leadid,
      valuetype: field.valuetype,
      oldvalue: field.oldvalue,
      updatedvalue: field.updatedvalue,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1,
      archieve: 0
    }).save();
  }

  return lead;
};

const deleteLeadWithAction = async (leadid, userid) => {
  // Find the lead
  const lead = await Lead.findOne({ leadid });
  if (!lead) throw new Error('Lead not found');

  // Mark as archived and inactive
  lead.archieve = 1;
  lead.active = 0;
  lead.updated_date = new Date();
  await lead.save();

  // Create UserLeadAction log entry
  await new UserLeadAction({
    userid,
    leadid,
    valuetype: 'status',
    oldvalue: lead.status,
    updatedvalue: 'deleted',
    created_date: new Date(),
    updated_date: new Date(),
    active: 0,
    archieve: 1
  }).save();

  return lead;
};

const getLeadActionsWithUser = async (leadid) => {
  // Build query
  const query = leadid ? { leadid: Number(leadid) } : {};
  // Get all actions (or filtered by leadid)
  const actions = await UserLeadAction.find(query).lean();
  // Get all unique userids
  const userIds = [...new Set(actions.map(a => a.userid))];
  // Get user details
  const users = await User.find({ userid: { $in: userIds }, active: 1, archieve: 0 }).lean();
  const userIdToUser = {};
  users.forEach(u => { userIdToUser[u.userid] = u; });
  // Get all unique leadids
  const leadIds = [...new Set(actions.map(a => a.leadid))];
  // Get lead details
  const leads = await Lead.find({ leadid: { $in: leadIds } }).lean();
  const leadIdToLead = {};
  leads.forEach(l => { leadIdToLead[l.leadid] = l; });
  // Attach user info and lead name to each action
  return actions.map(action => ({
    ...action,
    first_name: userIdToUser[action.userid]?.first_name || null,
    last_name: userIdToUser[action.userid]?.last_name || null,
    lead_name: leadIdToLead[action.leadid]?.name || null,
  }));
};

module.exports = {
  createLeadWithAction,
  getLeadsWithLastUpdatedBy,
  updateLeadWithAction,
  deleteLeadWithAction,
  getLeadActionsWithUser,
}; 