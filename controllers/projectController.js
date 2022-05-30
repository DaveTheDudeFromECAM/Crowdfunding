const db = require('../models/index');
const Game = db.Game;
const Project = db.Project;

const Platform = db.Platform;
const Category = db.Category;


exports.projectList = async function (req, res) {
    await Project.findAll({ include: [{model: Game, as:'games'}] })
        .then(data => {
            console.log("All projects:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.projectCreate = async (req, res) => {
    let project = Project.build({ name: req.body.name, info: req.body.info, raised: req.body.raised, goal : req.body.goal  })
    await project.save()
        .then(data => {
            console.log(project.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.projectUpdate = async function (req, res) {
    if (req.params.project_id > 0) {
        await Project.update(
            { name: req.body.name, info: req.body.info, raised: req.body.raised, goal : req.body.goal, categories: req.body.categories, platforms: req.body.platforms},
            { where: { project_id: req.params.project_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Project not found' })
}

exports.projectDelete = async function (req, res) {
    if (req.params.project_id) {
        await Project.destroy({ where: { project_id: req.params.project_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'project not found' })
}


//CHECK IT!!
exports.projectFindOne = async function (req, res) {
    if (req.params.project_id) {
        //await Project.findOne({ where: { project_id: req.params.project_id }, include: Game })
        await Project.findOne({ where: { project_id: req.params.project_id }, include: [{model: Platform, as:'platforms'}, {model: Game, as:'games'}, {model: Category, as:'categories'}] })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'project not found' })
}



exports.projectAddCategory = async function (req, res) {
    if (req.params.project_id) {
        await Project.findOne({ where: { project_id: req.params.project_id } })
            .then(project => {
                project.addCategory(req.body.category_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Project not found' })
}
exports.projectRemoveCategory = async function (req, res) {
    if (req.params.project_id) {
        await Project.findOne({ where: { project_id: req.params.project_id } })
            .then(project => {
                project.removeCategory(req.body.category_id).then(()=> {
                    res.json({message: 'Done'})
                })
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Project not found' })
}



const { Op } = require("sequelize");
exports.projectFindOp = async function (req, res) {
    if (req.params.name) {
        await Project.findAll({
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
