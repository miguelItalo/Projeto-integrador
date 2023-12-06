const express =require("express")
const router = express.Router()

const EmpresaController = require("../controllers/EmpresaController")

router.get("/empresa",EmpresaController.empresa)
 module.exports = router
