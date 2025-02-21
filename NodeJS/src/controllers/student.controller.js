const Student = require('../models/student.model');

// Define controller methods
const studentController = {
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createStudent: async (req, res) => {
    try {
      const student = new Student(req.body);
      const savedStudent = await student.save();
      res.status(201).json(savedStudent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = studentController;