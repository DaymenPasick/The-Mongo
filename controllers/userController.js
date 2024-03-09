//this file contains the methods behind for user api routes
const User = require('../models/User');


//example ObjectId "65ec9b61584f02271f809869"



module.exports = {
  //method to find all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //method to find a single user by their id 
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

  //method to create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //method to update a user by their id
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

  //method to delete a user
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

  //method to add a new friend(to a user)
  async addFriendToUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        //initial route needs user id
        //req.body needs id of user being added as friend
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


  async removeFriendFromUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        //initial route needs user id
        //req.body needs id of friend being deleted
        { _id: req.params.userId },
        { $pull: { friends:  req.params.friendId  } }, 
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'No user found having this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
