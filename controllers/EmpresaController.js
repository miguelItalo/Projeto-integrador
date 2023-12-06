const Empresa = require("../models/empresa")
const bcrypt = require("bcrypt")

module.exports = class EmpresaController {
    static async empresa(request, response) {
        return response.render("partials/empresa")
    }
    static async regitrarEmpresa(request, response) {
        return response.render("partials/empresa")
    }
    static async registrarEmpresaPost(request, response) {
        const { name, cnpj, razaoSocial, inscricaoEstadual, email, password, telefone, repetsenha } = request.body

        if (password != repetsenha) {
            request.flash("message", "As senhas não batem")
            return response.render("partials/empresa")
        }

        const checkEmpresa = await Empresa.findOne({ where: { email: email } })

        if (checkEmpresa){
          request.flash("message", "O e-mail já está em uso")
          return response.render("partials/empresa")
        }

        const salt = bcrypt.genSaltSync(10)

        const hashedPassword = bcrypt.hashSync(password, salt);

        const empresa = {
            name,
            email,
            senha: hashedPassword,
            cnpj,
            razaoSocial,
            inscricaoEstadual,
            telefone
        }

        try {
            const empresaCreate = await Empresa.create(empresa)
            request.session.userId = empresaCreate.id
            console.log(request.session.userId)
            request.flash("message", "Cadastro realizado com sucesso");
            request.session.save(() => {
                response.redirect("/locais");
            })
        } catch (error) {
            console.log(error)
        }
    }
}
