// Configuration
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000/api' // Empty string will use relative URLs 
    : 'https://quotes-blond.vercel.app/api'; // Use Vercel URL in production

// DOM elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const shareTwitterButton = document.getElementById('share-twitter');
const copyQuoteButton = document.getElementById('copy-quote');
const languageButtons = document.querySelectorAll('.lang-btn');
const notification = document.getElementById('notification');

// Current language and quote
let currentLanguage = 'en';
let currentQuote = '';

// Fetch a new quote
async function fetchQuote(language) {
    try {
        quoteElement.textContent = 'Loading...';
        authorElement.textContent = '';
        
        // Remove any existing pinyin elements
        const existingQuotePinyin = document.getElementById('quote-pinyin');
        if (existingQuotePinyin) existingQuotePinyin.remove();
        
        const existingAuthorPinyin = document.getElementById('author-pinyin');
        if (existingAuthorPinyin) existingAuthorPinyin.remove();

        // Construct API URL (relative or absolute based on API_URL setting)
        const apiEndpoint = `${API_URL}/quote?lang=${language}`;
        console.log(apiEndpoint);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error fetching quote');
        }
        
        const data = await response.json();
        
        // Update the UI
        quoteElement.textContent = data.quote;
        authorElement.textContent = `— ${data.author} —`;
        
        // Add pinyin if available (for Chinese languages)
        if (data.pinyin) {
            // Create and add quote pinyin
            const quotePinyinElement = document.createElement('div');
            quotePinyinElement.id = 'quote-pinyin';
            quotePinyinElement.className = 'pinyin-text';
            quotePinyinElement.textContent = data.pinyin.quote;
            quoteElement.insertAdjacentElement('afterend', quotePinyinElement);
            
            // Create and add author pinyin
            const authorPinyinElement = document.createElement('div');
            authorPinyinElement.id = 'author-pinyin';
            authorPinyinElement.className = 'pinyin-text';
            authorPinyinElement.textContent = `— ${data.pinyin.author} —`;
            authorElement.insertAdjacentElement('afterend', authorPinyinElement);
            
            // Apply fade-in animation to pinyin elements
            quotePinyinElement.style.animation = 'fadeIn 0.5s ease-in-out';
            authorPinyinElement.style.animation = 'fadeIn 0.5s ease-in-out';
        }
        
        // Save current quote
        currentQuote = data.quote;
        
        // Reset animation
        quoteElement.style.animation = 'none';
        authorElement.style.animation = 'none';
        
        // Trigger reflow
        void quoteElement.offsetWidth;
        void authorElement.offsetWidth;
        
        // Re-add animation
        quoteElement.style.animation = 'fadeIn 0.5s ease-in-out';
        authorElement.style.animation = 'fadeIn 0.5s ease-in-out';
        
    } catch (error) {
        console.error('Error:', error);
        quoteElement.textContent = 'Failed to fetch quote. Please try again.';
        authorElement.textContent = '';
    }
}

// Share quote on Twitter
function shareOnTwitter() {
    let text = `"${quoteElement.textContent}" ${authorElement.textContent}`;
    
    // Include pinyin if available
    const quotePinyin = document.getElementById('quote-pinyin');
    const authorPinyin = document.getElementById('author-pinyin');
    
    if (quotePinyin && authorPinyin && currentLanguage.startsWith('cn')) {
        text += `\n(Pinyin: "${quotePinyin.textContent}" ${authorPinyin.textContent})`;
    }
    
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, '_blank');
}

// Copy quote to clipboard
function copyToClipboard() {
    let text = `"${quoteElement.textContent}" ${authorElement.textContent}`;
    
    // Include pinyin if available
    const quotePinyin = document.getElementById('quote-pinyin');
    const authorPinyin = document.getElementById('author-pinyin');
    
    if (quotePinyin && authorPinyin && currentLanguage.startsWith('cn')) {
        text += `\n(Pinyin: "${quotePinyin.textContent}" ${authorPinyin.textContent})`;
    }
    
    // Use the Clipboard API if available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => showNotification())
            .catch(err => console.error('Could not copy text: ', err));
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showNotification();
        } catch (err) {
            console.error('Could not copy text: ', err);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    
    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Change language
function changeLanguage(language) {
    currentLanguage = language;
    
    // Update active button
    languageButtons.forEach(button => {
        if (button.dataset.lang === language) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Fetch new quote
    fetchQuote(language);
}

// Event listeners
newQuoteButton.addEventListener('click', () => fetchQuote(currentLanguage));
shareTwitterButton.addEventListener('click', shareOnTwitter);
copyQuoteButton.addEventListener('click', copyToClipboard);

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        changeLanguage(button.dataset.lang);
    });
});

// Initial quote fetch
document.addEventListener('DOMContentLoaded', () => {
    fetchQuote(currentLanguage);
}); 