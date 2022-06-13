const db = require('../models/index');
const Category = db.Category;
const Firm = db.Firm;
const Investor = db.Investor;
const Project = db.Project;

exports.investorList = async function (req, res) {
    await Investor.findAll()
        .then(data => {
            console.log("All investors:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.investorCreate = async (req, res) => {
    let investor = Investor.build(
        { name: req.body.name, money_spent: req.body.money_spent })
    await investor.save()
        .then(data => {
            console.log(investor.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.investorUpdate = async function (req, res) {
    if (req.params.investor_id > 0) {
        await Investor.update(
            { name: req.body.name, money_spent: req.body.money_spent },
            { where: { investor_id: req.params.investor_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'investor not found' })
}

exports.investorDelete = async function (req, res) {
    if (req.params.investor_id) {
        await Investor.destroy({ where: { investor_id: req.params.investor_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'investor not found' })
}

exports.investorFindById = async function (req, res) {
    if (req.params.investor_id) {
        await Investor.findOne({ where: { investor_id: req.params.investor_id }, include: Project })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'investor not found' })
}
exports.investorAddProject = async function (req, res) {
    if (req.params.investor_id) {
        await Investor.findOne({ where: { investor_id: req.params.investor_id } })
            .then(investor => {
                investor.addProject(req.body.project_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'investor not found' })
}
exports.investorRemoveProject = async function (req, res) {
    if (req.params.investor_id) {
        await Investor.findOne({ where: { investor_id: req.params.investor_id } })
            .then(investor => {
                investor.removeProject(req.body.investor_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'people not found' })
}

const { Op } = require("sequelize");
exports.investorFindByName = async function (req, res) {
    if (req.params.name) {
        await Investor.findAll({
            where: {name:{ [Op.startsWith]: req.params.name}}})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Bad input' })
}