let express = require('express');
let router = express.Router();

// Import user controllers
//const gameController = require('./controllers/gameController');
//const platformController = require('./controllers/platformController');
const categoryController = require('./controllers/categoryController');
const projectController = require('./controllers/projectController');
const firmController = require('./controllers/firmController');

// initial route
router.get('/', (req, res) => res.redirect('/projects'));

// category routes 
router.get('/categories', categoryController.categoryList);
router.post('/category', categoryController.categoryCreate);
router.put('/category/:category_id', categoryController.categoryUpdate);
router.delete('/category/:category_id', categoryController.categoryDelete);
router.get('/category/find/:category_id', categoryController.categoryFindOne);
 router.get('/category/filter/:name', categoryController.categoryFindOp);
// router.post('/category/addGame/:category_id', categoryController.categoryAddGame);

// projects routes 
router.get('/projects', projectController.projectList);
router.post('/project', projectController.projectCreate);
router.put('/project/:project_id', projectController.projectUpdate);
router.delete('/project/:project_id', projectController.projectDelete);
router.get('/project/find/:project_id', projectController.projectFindOne);
router.get('/project/filter/:name', projectController.projectFindOp);
router.post('/project/addCategory/:project_id', projectController.projectAddCategory);
router.post('/project/removeCategory/:project_id', projectController.projectRemoveCategory);

// firm routes
router.get('/firms', firmController.firmList);
router.post('/firm', firmController.firmCreate)
router.put('/firm/:firm_id', firmController.firmUpdate);
router.delete('/firm/:firm_id', firmController.firmDelete);
router.get('/firm/find/:firm_id', firmController.firmFindOne);
router.get('/firm/filter', firmController.firmFindOp);
router.post('/firm/addCategory/:firm_id', firmController.firmAddProject);
router.post('/firm/removePlatform/:firm_id', firmController.firmRemoveProject);


module.exports = router;