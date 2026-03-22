const express = require('express');
const router = express.Router();
const { searchBuses, getBusById } = require('../controllers/busController');

router.get('/search', searchBuses);
router.get('/:id', getBusById);

module.exports = router;
