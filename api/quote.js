const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin');

try {
  pinyin = require('pinyin');
  console.log('Pinyin version:', require('pinyin/package.json').version);
  console.log('STYLE_TONE:', pinyin.STYLE_TONE);
  const test = pinyin('你好');
  console.log(test);
} catch (e) {
  console.error('Error importing pinyin module:', e);
}

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
    // Read and parse the quotes.json file
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    const quotes = JSON.parse(data);
    
    // Get the language parameter from query string
    const lang = req.query.lang || 'en';
    
    // Check if the language exists
    if (!quotes[lang] || !Array.isArray(quotes[lang]) || quotes[lang].length === 0) {
      return res.status(404).json({
        error: `No quotes available for language: ${lang}`,
        availableLanguages: Object.keys(quotes)
      });
    }
    
    // get random quote
    const randomIndex = Math.floor(Math.random() * quotes[lang].length);
    const randomQuote = quotes[lang][randomIndex];
    
    // create response object
    const response = {
      language: lang,
      quote: randomQuote.quote, 
      author: randomQuote.author
    };
    
    // Return the result
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error loading quotes:', error);
    return res.status(500).json({ error: 'Failed to load quotes' });
  }
};