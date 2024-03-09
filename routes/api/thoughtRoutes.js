const router = require('express').Router();

//methods defined in thoughtController.js'
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');


//Route Example = http://localhost:3001/api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);


//Route Example = http://localhost:3001/api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//Route Example = http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

//Route Example = http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
