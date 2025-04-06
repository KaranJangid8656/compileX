# CompileX - AI Programming Assistant

A modern chatbot powered by Google's Gemini AI, designed to help with programming-related queries. This project features a sleek dark-themed UI with a responsive design and powerful AI capabilities.

## Project Structure

```
compile-x/
│
├── index.html                # Main HTML file with chatbot interface
├── style.css                 # CSS styling for the chatbot
├── script.js                 # JavaScript for frontend functionality
├── app.py                    # Python Flask backend with Gemini API integration
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

## Features

- 🤖 AI-powered coding assistant
- 💻 Clean, dark-themed UI with purple accents
- 🎤 Voice input capabilities
- 📎 File attachment support
- 📱 Responsive design for mobile and desktop
- 🧩 Proper code formatting with syntax highlighting
- 🔄 Real-time chat interface
- 🚁 Made by Karan

## Prerequisites

- Python 3.7 or higher
- Google Gemini API key
- Modern web browser

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure API Key

Open `app.py` and replace the API key with your own:

```python
GOOGLE_API_KEY = 'YOUR_API_KEY_HERE'
```

To get a Gemini API key:
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create an account if you don't have one
- Generate an API key

### 3. Start the Backend Server

```bash
python app.py
```

You should see output like:
```
* Running on http://0.0.0.0:5000
* Debug mode: on
```

### 4. Access the Frontend

Method 1: Open the HTML file directly
- Simply open `index.html` in your web browser

Method 2: Use a local server
```bash
# Using Python's built-in server
python -m http.server 8000
```
Then visit http://localhost:8000 in your browser

## Usage

1. Type your programming question in the input field
2. Press Enter or click the Send button
3. Wait for CompileX to generate a response
4. For voice input, click the microphone icon
5. To attach files, click the paperclip icon

## Troubleshooting

- **"Failed to fetch" error**: Make sure the Flask server is running on port 5000
- **API key errors**: Verify your Gemini API key is valid and has the necessary permissions
- **Model errors**: Make sure you're using a supported model name in the code

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **AI**: Google Gemini API
- **Additional Libraries**: 
  - Flask-CORS for handling cross-origin requests
  - Font Awesome for icons

## Made by Karan 🚁 