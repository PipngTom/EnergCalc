const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.send('Buildings route'));

module.exports = router;