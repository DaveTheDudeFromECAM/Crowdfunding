const Sequelize = require('sequelize')
const sequelize = new Sequelize( 
    'test2', 
    'root', 
    'root',  {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
   }
);
module.exports = sequelize