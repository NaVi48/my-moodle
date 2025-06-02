// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a Moodle navigation assistant..." },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await openaiRes.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error calling OpenAI");
    }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
