const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import API handlers
const apiIndex = require('./api/index');
const apiQuote = require('./api/quote');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Serve quotes.json file directly
app.use('/quotes.json', express.static('quotes.json'));

// API Routes
app.all('/api/quote', (req, res) => apiQuote(req, res));
app.all('/api', (req, res) => apiIndex(req, res));

// Default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
  console.log(`Quote endpoint: http://localhost:${PORT}/api/quote?lang=en`);
}); 