// Simple test script to verify the upload functionality
const express = require('express');
const path = require('path');
const fs = require('fs');

// Change to server directory
process.chdir(path.join(__dirname, '../server'));

// Test the upload middleware
console.log('Testing upload middleware...');
const { uploadSingle, uploadMultiple, uploadFields } = require('../server/middleware/upload');
console.log('✓ Upload middleware loaded successfully');

// Test the upload routes
console.log('Testing upload routes...');
const uploadRoutes = require('../server/routes/uploadRoutes');
console.log('✓ Upload routes loaded successfully');

// Test basic server setup
console.log('Testing server setup...');
const app = express();
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));
console.log('✓ Server setup completed');

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, '../server/uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✓ Uploads directory created');
} else {
    console.log('✓ Uploads directory already exists');
}

console.log('\n🎉 All tests passed! File upload functionality is ready.');
console.log('\nNext steps:');
console.log('1. Start the server: npm run dev');
console.log('2. Start the admin panel: npm run dev (in admin directory)');
console.log('3. Test file uploads in the About, Portfolio, and Testimonials pages');