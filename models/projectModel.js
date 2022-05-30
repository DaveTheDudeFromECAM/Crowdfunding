const Sequelize = require('sequelize')
const db = require('../database.js')

const Project = db.define('project', {
    project_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    info: { type: Sequelize.STRING, allowNull: true },
    raised: { type: Sequelize.INTEGER, allowNull: false },
    goal: { type: Sequelize.INTEGER, allowNull: false },

})

module.exports = Project