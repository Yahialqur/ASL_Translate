import os
from flask import Flask, request, jsonify, send_from_directory
from transformers import pipeline
import base64
import io
from PIL import Image

app = Flask(__name__, static_folder='frontend/dist')

pipe = pipeline("image-classification", model="Marxulia/asl_aplhabet_img_classifier_v3")

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_data = data.get('image')

        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400

        # Decode the base64 image
        try:
            image_bytes = base64.b64decode(image_data.split(',')[1])
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        except Exception as e:
            return jsonify({'error': 'Invalid image data', 'details': str(e)}), 400

        # Use the pipeline to classify the image
        try:
            results = pipe(image)
            prediction = results[0]["label"]
            confidence = results[0]["score"]

            return jsonify({'gesture': prediction, 'confidence': confidence})

        except Exception as e:
            return jsonify({'error': 'Error during prediction', 'details': str(e)}), 500

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != '' and os.path.exists(os.path.join(app.static_folder, path)):
        # Serve static files
        return send_from_directory(app.static_folder, path)
    else:
        # Serve index.html
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
