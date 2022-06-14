let express = require('express');
let router = express.Router();

// Controllers
const categoryController = require('./controllers/categoryController');
const firmController = require('./controllers/firmController');
const investorController = require('./controllers/investorController');
const projectController = require('./controllers/projectController');

// Homepage
router.get('/', (req, res) => res.redirect('/projects'));

// Categories
router.get('/categories', categoryController.categoryList);
router.post('/category', categoryController.categoryCreate);
router.put('/category/:category_id', categoryController.categoryUpdate);
router.delete('/category/:category_id', categoryController.categoryDelete);
router.get('/category/search/:name', categoryController.categoryFindByName);
router.get('/category/search/:category_id', categoryController.categoryFindById);

// Firms
router.get('/firms', firmController.firmList);
router.post('/firm', firmController.firmCreate)
router.put('/firm/:firm_id', firmController.firmUpdate);
router.delete('/firm/:firm_id', firmController.firmDelete);
router.get('/firm/search/:name', firmController.firmFindByName);
router.get('/firm/search/:firm_id', firmController.firmFindById);

router.post('/firm/addProject/:firm_id', firmController.firmAddProject);
router.post('/firm/removeProject/:firm_id', firmController.firmRemoveProject);

// Investors   
router.get('/investors', investorController.investorList);
router.post('/investor', investorController.investorCreate);
router.put('/investor/:investor_id', investorController.investorUpdate);
router.delete('/investor/:investor_id', investorController.investorDelete);
router.get('/investor/search/:name', investorController.investorFindByName);
router.get('/investor/search/:investor_id', investorController.investorFindById);

// Projects 
router.get('/projects', projectController.projectList);
router.post('/project', projectController.projectCreate);
router.put('/project/:project_id', projectController.projectUpdate);
router.delete('/project/:project_id', projectController.projectDelete);
//router.get('/project/search/:name', projectController.projectFindByName);
router.get('/project/search/:project_id', projectController.projectFindById);

router.post('/project/addCategory/:project_id', projectController.projectAddCategory);
router.post('/project/removeCategory/:project_id', projectController.projectRemoveCategory);
module.exports = router;