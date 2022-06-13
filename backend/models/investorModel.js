const Sequelize = require('sequelize')
const db = require('../database.js')

const Investor = db.define('people', {
    investor_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    money_spent: { type: Sequelize.INTEGER, allowNull: true },
})
module.exports = Investor