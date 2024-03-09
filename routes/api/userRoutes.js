const router = require('express').Router();


//this const group points to our user route methods
//within the controller directory
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
} = require('../../controllers/userController');


//route path for get users and create users
router.route('/')
  .get(getUsers)
  .post(createUser);

// route path for getting a single user by their id
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser);

//need to add put and delete by id routes to 
//update and delete users by their id

//need post method to add new friend to user friend list
//need delete method to remove friend for users friends list


 
module.exports = router;
