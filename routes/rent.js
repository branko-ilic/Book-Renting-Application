const express = require('express');
const controller = require('../controllers/rent');
const router = express.Router();

router.get('/books', controller.showBooks);
router.post('/rent', controller.rentBook);

module.exports = router;