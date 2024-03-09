//this file will help us keep our model references grouped
//neatly in one export file
const User = require('./User');
const Thought = require('./Thought');


//this will give us the ability to call upon our models
//elsewhere in our code
module.exports = { User, Thought };
