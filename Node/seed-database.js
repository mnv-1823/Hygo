const { MongoClient } = require('mongodb');

// MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'studentGradesDB';

// Sample student data
const sampleData = [
  {
    "name": "John Smith",
    "grades": [
      { "subject": "Math", "score": 87 },
      { "subject": "Science", "score": 92 },
      { "subject": "History", "score": 78 },
      { "subject": "English", "score": 85 }
    ]
  },
  {
    "name": "Emily Johnson",
    "grades": [
      { "subject": "Math", "score": 95 },
      { "subject": "Science", "score": 88 },
      { "subject": "History", "score": 91 },
      { "subject": "English", "score": 93 }
    ]
  },
  {
    "name": "Michael Williams",
    "grades": [
      { "subject": "Math", "score": 79 },
      { "subject": "Science", "score": 82 },
      { "subject": "History", "score": 85 },
      { "subject": "English", "score": 80 }
    ]
  },
  {
    "name": "Jessica Brown",
    "grades": [
      { "subject": "Math", "score": 91 },
      { "subject": "Science", "score": 94 },
      { "subject": "History", "score": 89 },
      { "subject": "English", "score": 92 }
    ]
  },
  {
    "name": "David Miller",
    "grades": [
      { "subject": "Math", "score": 72 },
      { "subject": "Science", "score": 78 },
      { "subject": "History", "score": 81 },
      { "subject": "English", "score": 75 }
    ]
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection('students');
    
    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert sample data
    const result = await collection.insertMany(sampleData);
    console.log(`${result.insertedCount} students inserted successfully`);
    
    // Display inserted IDs
    console.log('Inserted student IDs:');
    result.insertedIds && Object.values(result.insertedIds).forEach((id, index) => {
      console.log(`${index + 1}. ${sampleData[index].name}: ${id}`);
    });
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the function
seedDatabase();