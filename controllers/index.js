const router = require('express').Router();

const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
module.exports = router;