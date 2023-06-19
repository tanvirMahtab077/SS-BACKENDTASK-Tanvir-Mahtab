const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Movie List Api',
        author: 'Tanvir Mahtab (Software Engineer)',
    })
})



module.exports = router;