// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Loads environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To handle CORS

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Store OpenAI API key in .env

// POST route for chat functionality
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Model used for GPT-3 chat
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 150,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        res.json({ reply: response.data.choices[0].message.content }); // Respond with OpenAI reply
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ reply: "Something went wrong!" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
