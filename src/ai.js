const axios = require('axios');

// Call AI API with user query
async function queryAI(text) {
  try {
    const apiUrl = process.env.AI_API_URL;
    const response = await axios.get(apiUrl, {
      params: { text }
    });
    
    // Return both clean text and JSON data
    const cleanText = response.data.text || response.data.response || response.data.result || 'Sorry, I couldn\'t generate a response.';
    const jsonData = JSON.stringify(response.data, null, 2);
    
    return { cleanText, jsonData };
  } catch (error) {
    console.error('AI API Error:', error.message);
    return { 
      cleanText: 'Sorry, I encountered an error processing your request. Please try again.',
      jsonData: JSON.stringify({ error: 'Failed to process request', message: error.message }, null, 2)
    };
  }
}
      error: 'Failed to process request',
      message: error.message
    }, null, 2);
  }
}

module.exports = { queryAI };
