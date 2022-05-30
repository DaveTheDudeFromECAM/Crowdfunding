const Sequelize = require('sequelize')
const sequelize = require('../database.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import user models
db.Category = require('../models/categoryModel');
db.Firm = require('../models/firmModel');
db.Investor = require('../models/investorModel');
db.Project = require('../models/projectModel');

// projects <=> categories
db.Project.belongsToMany(db.Category, {
    through: "table_category_project",
    foreignKey: "project_id",
    as: "categories"
});
db.Category.belongsToMany(db.Project, {
    through: "table_category_project",
    foreignKey: "category_id",
    as: "project"
});

// projects <=> firms
db.Firm.belongsToMany(db.Project, {
    through: "table_firm_project",
    foreignKey: "firm_id",
    as: "Projects"
});
db.Project.belongsToMany(db.Firm, {
    through: "table_category_project",
    foreignKey: "project_id",
    as: "Firms"
});
module.exports = db