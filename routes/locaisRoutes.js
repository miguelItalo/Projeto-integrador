const express = require('express')
const router = express.Router()

const LocaisController = require('../controllers/LocaisController')

router.get('/locais', LocaisController.showLocais)

module.exports = router