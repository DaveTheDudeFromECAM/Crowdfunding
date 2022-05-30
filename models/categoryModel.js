const Sequelize = require('sequelize')
const db = require('../database.js')

const Category = db.define('category', {
    category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: true },
})

module.exports = Category