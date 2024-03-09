//this will allow the use of mongoos's Schema class and model
const { Schema, model, Types } = require('mongoose');


//for reference to use in thoughtSchema
const reactionSchema = new Schema (
    {
    //will be used for manapulation of reactions  
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    //for main reaction text
    reactionBody: {
        type: String,
        required:true,
        //will set length max of 1~280 chars
        maxLength:280,

    },

    //for username associated with reaction
    username: {
        type: String,
        required: true,
    },
    
      //formatting for timestamp of creation
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
          if (date) return date.toISOString().split("T") [0];
        },
      },
 }
)


//Schema for Thought model
const thoughtSchema = new Schema(
    {   

      //for main text of thoughts
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
        get: (date) => {
          if (date) return date.toISOString().split("T") [0];
        },
      },

      //for username associated with thought
      username: 
        {
            type: String,
            required:true,
            ref: 'user',
        },

      //for all reactions associated with their respective thought
      reactions : [reactionSchema]
    },
    {
      //allows for displaying of virtuals
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );


thoughtSchema
   //virtual will show length of reactions in thoughtSchema.reactions array
  .virtual('reactionCount')
  .get(function () {
    return `${this.reactions.length}`;
  })
  
  //initialising Thought model
  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;