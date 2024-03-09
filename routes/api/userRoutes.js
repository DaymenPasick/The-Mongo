const router = require('express').Router();


//this const group points to our user route methods
//within the controller directory
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  removeFriendFromUser
} = require('../../controllers/userController');


//route path for get users and create users
router.route('/')
  .get(getUsers)
  .post(createUser);

//route pathing when working with a user's id
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


//route path to add a friend to a user 
router.route('/:userId/friends')
  .post(addFriendToUser)

router.route('/:userId/friends/:friendId')
  .delete(removeFriendFromUser);

//need post method to add new friend to user friend list
//need delete method to remove friend for users friends list


 
module.exports = router;
