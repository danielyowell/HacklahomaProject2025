const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Comic Generator API');
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Replace with your Colab API endpoint and parameters
    const response = await axios.post('https://colab-api-endpoint', {
      prompt: prompt,
    });

    res.json({ image: response.data.image });
  } catch (error) {
    console.error('DY: Error generating image:', error);
    res.status(500).json({ error: 'DY: Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});