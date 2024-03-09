//this will allow us to use mongoos's Schema class and model
const { Schema, model } = require('mongoose');


// Schema for User model
const userSchema = new Schema(
    {
      //changed in class
      first: {
        type: String,
        required:true,
      },
      //changed in class
      last: {
        type: String,
        required:true,
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