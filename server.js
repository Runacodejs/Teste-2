require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const videoApiKey = process.env.VIDEO_API_KEY;
const musicApiKey = process.env.MUSIC_API_KEY;
const chatGptApiKey = process.env.CHAT_GPT_API_KEY;

app.post('/generate-lyrics', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Using a fictional OpenAI/ChatGPT-like API for demonstration
    const lyricsResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Escreva uma letra de música completa com o seguinte tema: "${prompt}". A letra deve ter começo, meio e fim, com pelo menos 3 estrofes.`}],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${chatGptApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (lyricsResponse.data.choices && lyricsResponse.data.choices.length > 0) {
      res.json({ lyrics: lyricsResponse.data.choices[0].message.content.trim() });
    } else {
      throw new Error("A resposta da API de letras não continha texto.");
    }
  } catch (error) {
    console.error("Erro ao gerar letra:", error.response ? error.response.data : error.message);
    res.status(500).json({ err: 'Ocorreu um erro ao gerar a letra da música.' });
  }
});

app.post('/generate-music', async (req, res) => {
  try {
    const { text } = req.body;

    // Assuming a fictional AI/ML API for music generation for demonstration
    const musicResponse = await axios.post("https://api.example.com/v1/music", {
      prompt: text,
      // other parameters like genre, length, etc. could be added here
    }, {
      headers: {
        'Authorization': `Bearer ${musicApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(musicResponse.data);
  } catch (error) {
    console.error("Erro ao gerar música:", error.response ? error.response.data : error.message);
    res.status(500).json({ err: 'Ocorreu um erro ao gerar a música.' });
  }
});

app.post('/generate-video', async (req, res) => {
  try {
    const { text } = req.body;

    // Assuming a fictional AI/ML API for video generation for demonstration
    const videoResponse = await axios.post("https://api.example.com/v1/videos", {
      prompt: text,
      // other parameters like length, style, etc. could be added here
    }, {
      headers: {
        'Authorization': `Bearer ${videoApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(videoResponse.data);
  } catch (error) {
    console.error("Erro ao gerar vídeo:", error.response ? error.response.data : error.message);
    res.status(500).json({ err: 'Ocorreu um erro ao gerar o vídeo.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});