const axios = require('axios');

// Call AI API with user query
async function queryAI(text) {
  try {
    const apiUrl = process.env.AI_API_URL;
    const response = await axios.get(apiUrl, {
      params: { text }
    });
    
    // Return clean text only
    return response.data.text || response.data.response || response.data.result || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('AI API Error:', error.message);
    return 'Sorry, I encountered an error processing your request. Please try again.';
  }
}

module.exports = { queryAI };
