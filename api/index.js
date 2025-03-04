const fs = require('fs');
const path = require('path');

// Đường dẫn đến tệp JSON chứa trích dẫn
const quotesFilePath = path.join(process.cwd(), 'quotes.json');

// Hàm xử lý serverless
module.exports = async (req, res) => {
  // Bật CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Xử lý OPTIONS request (pre-flight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Chỉ xử lý GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Đọc và phân tích tệp quotes.json để lấy các ngôn ngữ có sẵn
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    const quotes = JSON.parse(data);
    const availableLanguages = Object.keys(quotes);
    
    // Trả về thông tin API
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