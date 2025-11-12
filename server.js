require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.CHATGPT_API_KEY;

app.post('/generate-music', async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Generate song lyrics based on the following text: ${text}` }],
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Erro ao gerar música:", error.response ? error.response.data : error.message);
    res.status(500).json({ err: 'Ocorreu um erro ao gerar a música.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});