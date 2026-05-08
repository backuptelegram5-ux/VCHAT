require('dotenv').config();

const axios = require('axios');
const { queryAI } = require('../src/ai');
const { sendMessage, sendTyping, sendDocument } = require('../src/telegram');

// Webhook handler for Telegram
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    
    // Handle message updates
    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const userMessage = update.message.text;
      
      // Send typing indicator
      await sendTyping(chatId);
      
      // Query AI and get both clean text and JSON
      const result = await queryAI(userMessage);
      
      // Send clean text message first
      await sendMessage(chatId, result.cleanText);
      
      // Then send JSON as text file
      await sendDocument(chatId, result.jsonData, 'ai_response.json');
    }
    
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
