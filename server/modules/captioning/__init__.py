import sys
from flask import Blueprint, jsonify, request
import datetime

from .model import BlipCaptioningModel

bp = Blueprint('captioning', __name__, url_prefix='/api/caption') # May need to add captioning behind later, if it's needed
model = BlipCaptioningModel()

@bp.route('/url/', methods=['POST'])
def generate_caption_url():
    # Get the image URL from the request
    image_url = request.json['image_url']
    # Get current time stamp
    time = datetime.datetime.now()
    # Generate the caption
    caption = model.generate_caption_from_url(image_url)
    time_to_generate = datetime.datetime.now() - time
    # Return the caption as JSON
    return jsonify({'caption': caption, 'time_to_generate': time_to_generate.total_seconds()})

@bp.route('/image/', methods=['POST'])
def generate_caption_image():
    # Get the image from the request
    image = request.files.get('image')
    # Get current time stamp
    time = datetime.datetime.now()
    # Generate the caption
    caption = model.generate_caption(image)
    time_to_generate = datetime.datetime.now() - time
    # Return the caption as JSON
    return jsonify({'caption': caption, 'time_to_generate': time_to_generate.total_seconds()})