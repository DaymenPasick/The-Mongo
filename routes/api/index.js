const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
//in class- swap out video with thoughts
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
