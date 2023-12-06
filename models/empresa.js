const {DataTypes} =require("sequelize")
const db = require("../db/conn")

const Empresa = db.define("Empresa",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    cnpj:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    razaoSocial:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    inscricaoEstadual:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    senha:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    },
    telefone:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    }
})
module.exports= Empresa