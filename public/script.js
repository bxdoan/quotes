// Configuration
const API_URL = 'https://quotes-blond.vercel.app/api'; // Replace with your Vercel API URL

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

        const response = await fetch(`${API_URL}/quote?lang=${language}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error fetching quote');
        }
        
        const data = await response.json();
        
        // Update the UI
        quoteElement.textContent = data.quote;
        authorElement.textContent = `— ${data.author} —`;
        
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
    const text = `"${quoteElement.textContent}" ${authorElement.textContent}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, '_blank');
}

// Copy quote to clipboard
function copyToClipboard() {
    const text = `"${quoteElement.textContent}" ${authorElement.textContent}`;
    
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