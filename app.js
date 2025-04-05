const config = require('./config');

// Use the API key without hardcoding it
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${config.apiKey}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
