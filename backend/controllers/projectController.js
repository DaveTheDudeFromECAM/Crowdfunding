const db = require('../models/index');
const Category = db.Category;
const Firm = db.Firm;
const Investor = db.Investor;
const Project = db.Project;

exports.projectList = async function (req, res) {
    await Project.findAll()
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
exports.projectFindById = async function (req, res) {
    if (req.params.project_id) {
        await Project.findOne({ where: { project_id: req.params.project_id } })
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
exports.projectFindByName = async function (req, res) {
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