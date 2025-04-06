const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const voiceBtn = document.getElementById('voice-btn');
const fileInput = document.getElementById('file-input');

// Handle Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Handle file upload
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        const fileList = Array.from(files).map(file => file.name).join(', ');
        addMessage(`📎 Attached files: ${fileList}`, 'user');
    }
});

// Voice input using SpeechRecognition
let recognition;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening = true;
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
    };

    recognition.onend = () => {
        isListening = false;
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        addMessage('❌ Speech recognition error. Try again!', 'bot');
    };
} else {
    console.warn('SpeechRecognition not supported');
    voiceBtn.disabled = true;
}

voiceBtn.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

// Send user message to backend
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    try {
        const typingIndicator = addMessage('🤖 Typing...', 'bot');

        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ message }),
        });

        typingIndicator.remove();

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        addMessage(data.response, 'bot', true);
    } catch (error) {
        console.error('Error:', error);
        addMessage(`❌ ${error.message}`, 'bot');
    }
}

// Add chat message
function addMessage(text, sender, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender} fade-in`;

    if (isHTML) {
        const html = marked.parse(text);
        messageDiv.innerHTML = html;

        setTimeout(() => {
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);

                const copyBtn = document.createElement('button');
                copyBtn.textContent = 'Copy';
                copyBtn.className = 'copy-btn';
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(block.textContent).then(() => {
                        copyBtn.textContent = 'Copied!';
                        copyBtn.classList.add('copied');
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                            copyBtn.classList.remove('copied');
                        }, 1500);
                    });
                };
                block.parentElement.style.position = 'relative';
                block.parentElement.appendChild(copyBtn);
                block.parentElement.style.padding = '1rem';
                block.parentElement.style.borderRadius = '8px';
                block.parentElement.style.overflowX = 'auto';
                block.parentElement.style.backgroundColor = '#1e1e1e';
                block.style.whiteSpace = 'pre-wrap';
            });
        }, 50);
    } else {
        messageDiv.textContent = text;
    }

    chatMessages.appendChild(messageDiv);
    return messageDiv;
}

// Show welcome message on load
window.addEventListener('DOMContentLoaded', () => {
        addMessage("👋 Hi! How can I assist you today?", 'bot');
});
