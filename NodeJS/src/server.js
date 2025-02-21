const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');

// Load env vars - This must come before other imports that might use env vars
dotenv.config();

const studentRoutes = require('./routes/student.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Student API' });
});

// Mount routes
app.use('/api/students', studentRoutes);

// Connect to database
connectDB().then(() => {
  // Start server only after successful database connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});