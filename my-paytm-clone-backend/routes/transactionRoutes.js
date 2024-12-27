const express = require('express');
const router = express.Router();
const { transaction } = require('../controllers/transactionController');
const authenticate = require('../middleware/authenticate');
router.post('/', transaction);

router.post('/', authenticate, transaction);

module.exports = router;
