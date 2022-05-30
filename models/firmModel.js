const Sequelize = require('sequelize')
const db = require('../database.js')

const Firm = db.define('firm', {
    firm_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    info: { type: Sequelize.STRING, allowNull: true },

})

module.exports = Firm