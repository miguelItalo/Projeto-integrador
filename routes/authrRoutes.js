const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')
const EmpresaController = require("../controllers/EmpresaController")
const LocaisController = require("../controllers/LocaisController")
const ProdutosController = require("../controllers/ProdutosController")

router.get('/', AuthController.createUser)
router.get("/opcoes",AuthController.opcoes)
router.get("/cadastroUsuario",AuthController.usuario)
router.get("/empresa",EmpresaController.empresa)
router.get("/locais",LocaisController.showLocais)
router.get("/regitrEmpresa",EmpresaController.regitrarEmpresa)
router.get('/produtos', ProdutosController.showProdutos)

router.post("/registrEmpresa",EmpresaController.registrarEmpresaPost)

router.get("/registrar",AuthController.registrar)
router.post("/registrar",AuthController.registrarPost)
router.get("/login",AuthController.login)
router.post("/login",AuthController.loginPost)
router.get("/logout",AuthController.logout)

router.get("/parceria",AuthController.parceria)
router.get("/efeito",AuthController.efeito)
router.get("/motivoDescarte",AuthController.motivoDescarte)
router.get("/assinatura",AuthController.assinatura)

module.exports = router