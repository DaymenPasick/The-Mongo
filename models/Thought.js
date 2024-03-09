//this will allow us to use mongoos's Schema class and model
const { Schema, model } = require('mongoose');


// Schema for User model
const thoughtSchema = new Schema(
    {
      //formatting for username
      username: {
        type: String,
        required:true,
        trim:true,
      },

      //formatting for email
      email: {
        type: String,
        required:true,
        //this will make sure no emails are the same
        unique:true,
        //needs validation for matching email adress format
      },

      //creates association with Thought model
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],

      //creates self-association with User model
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
    },
    {
      //added this in case we do want to include virtuals, but may not need
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;

  //need to do email validation
  //need to add virtual of friendCount that retrieves length of the user's friends array