const db = require('../models/index');
const Category = db.Category;
const Firm = db.Firm;
const Investor = db.Investor;
const Project = db.Project;

exports.categoryList = async function (req, res) {
    await Category.findAll()
        .then(data => {
            console.log("All categories:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.categoryCreate = async (req, res) => {
    let category = Category.build({ name: req.body.name, description: req.body.description })
    await category.save()
        .then(data => {
            console.log(category.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.categoryUpdate = async function (req, res) {
    if (req.params.category_id > 0) {
        await Category.update(
            { name: req.body.name, description: req.body.description },
            { where: { category_id: req.params.category_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

exports.categoryDelete = async function (req, res) {
    if (req.params.category_id) {
        await Category.destroy({ where: { category_id: req.params.category_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

exports.categoryFindById = async function (req, res) {
    if (req.params.category_id) {
        await Category.findOne({ where: { category_id: req.params.category_id }, include: Game })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}
exports.categoryAddGame = async function (req, res) {
    if (req.params.category_id) {
        await Category.findOne({ where: { category_id: req.params.category_id } })
            .then(category => {
                category.addGame(req.body.game_id).then(() => {
                    res.json({ message: 'Done' })
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

const { Op } = require("sequelize");
exports.categoryFindByName = async function (req, res) {
    if (req.params.name) {
        await Category.findAll({
            where: { name: { [Op.startsWith]: req.params.name } }
        })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Bad input' })
}