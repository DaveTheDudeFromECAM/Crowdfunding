const db = require('../models/index');
const Project = db.Project;
const People = db.People;


exports.peopleList = async function (req, res) {
    await People.findAll({ include: [{model: Project, as:'projects'}] })
        .then(data => {
            console.log("All categories:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.peopleCreate = async (req, res) => {
    let people = People.build(
        { name: req.body.name, money_spent: req.body.money_spent })
    await people.save()
        .then(data => {
            console.log(people.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.peopleUpdate = async function (req, res) {
    if (req.params.people_id > 0) {
        await People.update(
            { name: req.body.name, money_spent: req.body.money_spent },
            { where: { people_id: req.params.people_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'People not found' })
}

exports.peopleDelete = async function (req, res) {
    if (req.params.people_id) {
        await People.destroy({ where: { people_id: req.params.people_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'people not found' })
}

exports.peopleFindOne = async function (req, res) {
    if (req.params.people_id) {
        //await People.findOne({ where: { people_id: req.params.people_id }}) does it work ??
        await People.findOne({ where: { people_id: req.params.people_id }, include: Project })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'people not found' })
}
exports.peopleAddProject = async function (req, res) {
    if (req.params.people_id) {
        await People.findOne({ where: { people_id: req.params.people_id } })
            .then(people => {
                people.addProject(req.body.project_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'people not found' })
}
exports.peopleRemoveProject = async function (req, res) {
    if (req.params.people_id) {
        await People.findOne({ where: { people_id: req.params.people_id } })
            .then(people => {
                people.removeProject(req.body.project_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'people not found' })
}

const { Op } = require("sequelize");
exports.peopleFindOp = async function (req, res) {
    if (req.params.name) {
        await People.findAll({
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