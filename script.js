const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");

// Simulated AI responses
const aiResponses = [
    "Hello! How can I assist you today?",
    "That's an interesting question! Let me think about that.",
    "I’m here to help! Can you clarify your question?",
    "Could you provide more details?",
    "I appreciate your curiosity. Let's dive deeper into that.",
    "Let me process that for a moment..."
];

// Function to generate AI response
function generateAIResponse() {
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    return aiResponses[randomIndex];
}

// Function to display a message in the chat window
function displayMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("p-2", "rounded-lg", "w-fit", "max-w-md", "break-words", "my-1");

    if (sender === "user") {
        messageDiv.classList.add("bg-blue-600", "text-white", "ml-auto", "text-right");
    } else {
        messageDiv.classList.add("bg-gray-700", "text-gray-300", "mr-auto", "text-left");
    }

    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);

    // Auto-scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to handle sending a message
function handleSendMessage() {
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Display user's message
        displayMessage("user", userMessage);

        // Clear the input field
        userInput.value = "";

        // Simulate AI response with a delay
        setTimeout(() => {
            const aiMessage = generateAIResponse();
            displayMessage("ai", aiMessage);
        }, 1000);
    }
}

// Event listeners
sendBtn.addEventListener("click", handleSendMessage);

userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSendMessage();
    }
});

