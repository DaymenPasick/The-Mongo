//this will allow us to use mongoos's Schema class and model
const { Schema, model } = require('mongoose');


// Schema for User model
const userSchema = new Schema(
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
      age: Number,
      //creating association with thoughts Schema
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
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