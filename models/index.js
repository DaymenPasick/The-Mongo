//this file will help us keep our model references grouped
//neatly in one export file
const User = require('./User');
const Reaction = require('./Reaction'); //may not need this per challenge reqs
const Thought = require('./Thoughts');


//this will give us the ability to call upon our models
//elsewhere in our code
module.exports = { User, Thought, Reaction };
