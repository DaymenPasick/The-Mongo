const router = require('express').Router();


//this const group points to our user route methods
//within the controller directory
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/userController');


//route path for get all users and create users
router.route('/')
  .get(getUsers)
  .post(createUser);

// route path for getting a single user by their id
router.route('/:userId')
  .get(getSingleUser);

//need to add put and delete by id routes to 
//update and delete users by their id


 
module.exports = router;
