//npm packages
const express = require('express');
const router = express.Router();

//Controller
const {getPrice} = require('../controllers/userController.js');

/* ROUTES */

//Get price
router.get('/', getPrice)

module.exports = router;