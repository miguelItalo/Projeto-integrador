const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('edump', 'root', 'Tamaki900', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conn Mysql')
}
catch(err){
    console.log(err)
}

module.exports = sequelize
