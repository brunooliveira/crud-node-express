const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Routes
router.get('/', teacherController.view);
router.post('/', teacherController.find);
router.get('/addteacher', teacherController.form);
router.post('/addteacher', teacherController.create);
router.get('/editteacher/:id', teacherController.edit);
router.post('/editteacher/:id', teacherController.update);
router.get('/viewteacher/:id', teacherController.viewall);
router.get('/:id',teacherController.delete);
  
module.exports = router;