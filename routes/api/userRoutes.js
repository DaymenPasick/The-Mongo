const router = require('express').Router();

//method defined in userController.js
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  removeFriendFromUser
} = require('../../controllers/userController');


//Route Example = http://localhost:3001/api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

//Route Example = http://localhost:3001/api/users/:userId
//:userId will be the user's generated "_id" 
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

//Route Example = http://localhost:3001/api/users/:userId/friends
//:userId will be the user's "_id"
router.route('/:userId/friends')
  .post(addFriendToUser)

//Route Example = http://localhost:3001/api/users/:userId/friends/:friendId
//:userId will be the user's "_id" 
//:friendId will be the friends's "_id" 
router.route('/:userId/friends/:friendId')
  .delete(removeFriendFromUser);

 
module.exports = router;
