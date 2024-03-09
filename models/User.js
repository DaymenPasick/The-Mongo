//this will allow use of mongoos's Schema class and model
const { Schema, model } = require('mongoose');


var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

//Schema for User model
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
        //this will make sure no emails are the same
        unique:true,
        //following 3 lines will test for valid email convention
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
      //allows for displaying of virtuals 
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );



userSchema
   //virtual will show length of friends in userSchema.friends array
  .virtual('friendCount')
  .get(function () {
    return `${this.friends.length}`;
  })


  //initialising User model
  const User = model('user', userSchema);

  module.exports = User;

  //need to add virtual of friendCount that retrieves length of the user's friends array
