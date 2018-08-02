const router = require('express').Router();

router.use('/cycles', require('./cycles'));
router.use('/', require('./auth'));

router.get('*', function(req, res) {
    res.status(404).send({ message: 'Invalid endpoint' });
});

module.exports = router;