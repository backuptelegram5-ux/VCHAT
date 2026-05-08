const axios = require('axios');

// Send message to Telegram user
async function sendMessage(chatId, text) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    await axios.post(url, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Telegram Send Error:', error.message);
  }
}

// Send typing indicator
async function sendTyping(chatId) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendChatAction`;
    
    await axios.post(url, {
      chat_id: chatId,
      action: 'typing'
    });
  } catch (error) {
    console.error('Telegram Typing Error:', error.message);
  }
}

// Send document (text file) to Telegram user
async function sendDocument(chatId, content, filename = 'response.txt') {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // Send as a message with file-like formatting
    const message = `<code>${filename}</code>\n\n<code>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`;
    
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Telegram Document Error:', error.message);
  }
}

module.exports = { sendMessage, sendTyping, sendDocument };
