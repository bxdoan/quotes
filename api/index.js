const fs = require('fs');
const path = require('path');

// Path to the JSON file containing quotes
const quotesFilePath = path.join(process.cwd(), 'quotes.json');

// Serverless function handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request (pre-flight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only process GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read and parse quotes.json to get available languages
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    const quotes = JSON.parse(data);
    const availableLanguages = Object.keys(quotes);
    
    // Return API information
    return res.status(200).json({
      message: 'Welcome to the Quotes API',
      endpoints: {
        quote: '/api/quote?lang=<language>'
      },
      availableLanguages
    });
    
  } catch (error) {
    console.error('Error loading quotes:', error);
    return res.status(500).json({ 
      message: 'Welcome to the Quotes API',
      endpoints: {
        quote: '/api/quote?lang=<language>'
      },
      error: 'Failed to load available languages'
    });
  }
};