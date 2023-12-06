const express = require('express')
const router = express.Router()
const ProdutosController = require('../controllers/ProdutosController')

router.get('/', ProdutosController.showProdutos)

module.exports = router
