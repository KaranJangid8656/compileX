from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Replace with your actual API key
GOOGLE_API_KEY = "AIzaSyAq2H5b_5hAoCOr5feauVejAG-79kg_R4U"

# Configure Gemini
genai.configure(api_key=GOOGLE_API_KEY)

MODEL_NAME = "models/gemini-1.5-pro-latest"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        model = genai.GenerativeModel(model_name=MODEL_NAME)
        response = model.generate_content(user_message)

        # Use .text or combine all parts for HTML rendering
        result = response.text or ''.join([part.text for part in response.parts])
        return jsonify({'response': result})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
