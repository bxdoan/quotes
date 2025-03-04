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
    // Đọc và phân tích tệp quotes.json
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    const quotes = JSON.parse(data);
    
    // Lấy tham số ngôn ngữ từ query string
    const lang = req.query.lang || 'en';
    
    // Kiểm tra ngôn ngữ có tồn tại không
    if (!quotes[lang] || !Array.isArray(quotes[lang]) || quotes[lang].length === 0) {
      return res.status(404).json({
        error: `No quotes available for language: ${lang}`,
        availableLanguages: Object.keys(quotes)
      });
    }
    
    // Lấy trích dẫn ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * quotes[lang].length);
    const randomQuote = quotes[lang][randomIndex];
    
    // Trả về kết quả
    return res.status(200).json({
      language: lang,
      quote: randomQuote.quote, 
      author: randomQuote.author
    });
    
  } catch (error) {
    console.error('Error loading quotes:', error);
    return res.status(500).json({ error: 'Failed to load quotes' });
  }
};