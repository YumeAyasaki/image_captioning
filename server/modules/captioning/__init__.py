import sys
from flask import Blueprint, jsonify, request
import datetime

from .model import BlipCaptioningModel

bp = Blueprint('captioning', __name__)
model = BlipCaptioningModel()

@bp.route('/generate', methods=['POST'])
def generate_caption():
    # Get the image URL from the request
    image_url = request.json['image_url']
    # Get current time stamp
    time = datetime.datetime.now()
    # Generate the caption
    caption = model.generate_caption_from_url(image_url)
    time_to_generate = datetime.datetime.now() - time
    # Return the caption as JSON
    return jsonify({'caption': caption, 'time_to_generate': time_to_generate.total_seconds()})

