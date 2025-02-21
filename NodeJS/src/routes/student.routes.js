const express = require('express');
const studentController = require('../controllers/student.controller');

// Create router instance
const router = express.Router();

// Define routes
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

// Export the router
module.exports = router;
