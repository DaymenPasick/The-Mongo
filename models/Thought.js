//this will allow us to use mongoos's Schema class and model
const { Schema, model } = require('mongoose');


//for reference to use in thoughtSchema
const reactionSchema = new Schema (
    {
    //will give each reaction an objectId when created
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },


    reactionBody: {
        type: String,
        required:true,
        //will set length max of 1~280 chars
        maxLength:280,

    },

    username: {
        type: String,
        required: true,
    },
    
      //formatting for timestamp of creation
      createdAt: {
        type: Date,
        default: Date.now,
        //need getter method for formatting upon query
      },

 }
)


// Schema for User model
const thoughtSchema = new Schema(
    {   

      //for thoughts
      thoughtText: {
        type: String,
        required:true,
        //will set length limit of 1~280 chars
        minLength:1,
        maxLength:280,
      },

      //formatting for timestamp of creation
      createdAt: {
        type: Date,
        default: Date.now,
        //need getter method for formatting upon query
      },

      //this will reference the user that created the thought
      //may need more code to work properly
      username: 
        {
            type: String,
            required:true,
            ref: 'user',
        },


      reaction : [reactionSchema]



    },
    {
      //added this in case we do want to include virtuals, but may not need
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  //initialising Thought model
  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;

  //need getter method for formatting upon query
  //may need more code for proper user-thought reference
  //need to add virtual of reactionCount that retrieves length of the thoughts's reactions array
  