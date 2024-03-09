//this will point any route /api to the api directory
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('route does not exist');
});

module.exports = router;
