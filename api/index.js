const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',                // Allow all origins
  methods: ['GET', 'POST'],   // Allow GET and POST methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow Content-Type and Authorization headers
})); // Enable CORS for all routes
const PORT = process.env.PORT || 3000;

// Load quotes from JSON file
const loadQuotes = () => {
  try {
    const quotesPath = path.join(__dirname, '..', 'quotes.json');
    const quotesData = fs.readFileSync(quotesPath, 'utf8');
    return JSON.parse(quotesData);
  } catch (error) {
    console.error('Error loading quotes:', error);
    return {};
  }
};

// API endpoint to get a random quote based on language
app.get('/quote', (req, res) => {
  const lang = req.query.lang || 'en';
  const quotes = loadQuotes();
  
  // Check if the requested language exists
  if (!quotes[lang] || !Array.isArray(quotes[lang]) || quotes[lang].length === 0) {
    return res.status(404).json({
      error: `No quotes available for language: ${lang}`,
      availableLanguages: Object.keys(quotes)
    });
  }
  
  // Get a random quote from the specified language
  const randomIndex = Math.floor(Math.random() * quotes[lang].length);
  const randomQuote = quotes[lang][randomIndex];
  
  return res.json({
    language: lang,
    ...randomQuote
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Quotes API',
    endpoints: {
      quote: '/quote?lang=<language>',
    },
    availableLanguages: Object.keys(loadQuotes())
  });
});

// Start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
module.exports = app; 