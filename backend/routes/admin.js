//npm packages
const express = require('express');
const router = express.Router();

//Controller
const {getAllMatrix, getMatrix, copyAndChange} = require('../controllers/adminController.js');

/* ROUTES */

//Get names of all matrix
router.get('/', getAllMatrix);

//Get content of a single matrix
router.get('/:id', getMatrix);

//Copy matrix and change it
router.post('/:id', copyAndChange);



module.exports = router;