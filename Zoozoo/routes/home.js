const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
    res.render('home/index');
});

module.exports = router;