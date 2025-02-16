const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
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
    res.json({ pdf_url: `http://localhost:${port}/generated_comics/AI_Comic_Book-6.pdf` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.use('/generated_comics', express.static(path.join(__dirname, 'generated_comics')));
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});