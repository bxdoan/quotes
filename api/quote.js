const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin');

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
    
    // Lấy trích dẫn ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * quotes[lang].length);
    const randomQuote = quotes[lang][randomIndex];
    
    // Tạo response object
    const response = {
      language: lang,
      quote: randomQuote.quote, 
      author: randomQuote.author
    };
    
    // If language starts with "cn", add pinyin field
    if (lang.startsWith('cn')) {
      // Convert quote to pinyin
      const quoteInPinyin = pinyin(randomQuote.quote, {
        style: pinyin.STYLE_TONE, // Include tone marks
        heteronym: false          // Do not include multiple pronunciations
      }).map(p => p.join(' ')).join(' ');
      
      // Convert author name to pinyin (if author name is Chinese)
      const authorInPinyin = pinyin(randomQuote.author, {
        style: pinyin.STYLE_TONE,
        heteronym: false
      }).map(p => p.join(' ')).join(' ');
      
      // Add pinyin to response
      response.pinyin = {
        quote: quoteInPinyin,
        author: authorInPinyin
      };
    }
    
    // Return the result
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error loading quotes:', error);
    return res.status(500).json({ error: 'Failed to load quotes' });
  }
};