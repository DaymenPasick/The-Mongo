const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought found having this ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        //this will requre the user:id to be included
        //in the post req body
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'No valid user with that ID, thought was created without a user',
        });
      }

      res.json('thought created');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //will update thoughts properly BUT
  //if thought was created without a user affiliated
  //updating thought with user info WONT
  //affiliate that thought with the user.
  //may fix if time!
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found having this ID!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought having this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought deleted but no user found having this id!' });
      }

      res.json({ message: 'Thought has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: {reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found having this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // Remove reaction 
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought found having this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};


//test 2
