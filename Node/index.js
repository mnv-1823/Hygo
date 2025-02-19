const http = require('http');
const { MongoClient } = require('mongodb');

// MongoDB configuration
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'studentGradesDB';
const COLLECTION = 'students';

// Create server
const server = http.createServer(async (req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Only handle GET requests to /api/students
  if (req.method === 'GET' && req.url === '/api/students') {
    try {
      // Connect to MongoDB
      const client = new MongoClient(MONGO_URI);
      await client.connect();
      console.log('Connected to MongoDB');
      
      // Get students from database
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION);
      const students = await collection.find({}).toArray();
      
      // Close connection
      await client.close();
      
      // Send successful response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(students));
      
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  } else {
    // Return 404 for any other routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the student list at: http://localhost:${PORT}/api/students`);
});