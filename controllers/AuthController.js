const User = require('../models/User')
const bcrypt = require("bcrypt")
const flash = require("express-flash")

module.exports = class UserController {
    static createUser(req, res) {
        return res.render('home')
    }
    static async opcoes(request, response) {
        return response.render("partials/escolhaCadastro")
    }
    static async usuario(request, response) {
        return response.render("partials/usuario")
    }
    static async registrar(request, response) {
        return response.render("partials/usuario")
    }
    static async registrarPost(request, response) {
        const { name, email, password, repetsenha } = request.body;

        if (password != repetsenha) {
            request.flash( "message", "As senhas não batem")
            return response.render("partials/usuario")

        }

        const checkUser = await User.findOne({ where: { email: email } })

        if (checkUser) {
            request.flash( "message", "O e-mail já está em uso")
            return response.render("partials/usuario")

        }
        const salt = bcrypt.genSaltSync(10);
  
    const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password:hashedPassword
        }
        try {
            const createUser = await User.create(user)
            request.session.userId = createUser.id
            console.log(request.session.userId)
            request.flash( "message","Cadastro realizado com sucesso");
            request.session.save(() => {
                response.redirect("/locais");
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async login(request,response){
        return response.render("partials/usuario")
    }
    
    static async loginPost(request,response){
     const {email,password} = request.body

     const user = await User.findOne({where:{email:email}})
     if(!user){
     console.log( "Usuário não encontrado");
        return response.redirect("/login")

     }
     const passwordMatch = bcrypt.compareSync(password,user.password)
     if(!passwordMatch){
        request.flash( "message","Senha inválida")
    return response.redirect("login")

     }
     request.session.userId = user.id
     request.flash( "message","Autenticação realizado com sucesso");
     request.session.save(() => {
       response.redirect("/locais");
     });
    }

    static async parceria(request,response){
return response.render("partials/parcerias")
    }
    static async efeito(request,response){
        return response.render("partials/como-afeta")
    }
    static async motivoDescarte(request,response){
        return response.render("partials/motivoDescarte")
    }
    static async assinatura(request,response){
        return response.render("partials/assinatura")
    }
    static async logout(request, response){
      request.session.destroy()
      return response.redirect('/')
    }
}
