//this will will contain the logic/methods behind
//our user api routes
const User = require('../models/User');

module.exports = {
  //find all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //find a single user by their id 
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user found having that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update user by their id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found having that ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete user by their id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found having this id!' });
      }

      res.json({ message: 'Specified user has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //find a user by their id and add a friend to that user
  //method works, but would like a way to see friend's
  //name rather than ObjectId in array return
  async addFriendToUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        //initial route needs user id
        //req.body needs id of friend(user) being added
        { _id: req.params.userId },
        { $addToSet: {friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found having this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


//need delete method to remove friend for users friends list

};
