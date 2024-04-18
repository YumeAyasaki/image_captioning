import sys, os
from flask import Blueprint, jsonify, request, make_response
import datetime
from .model import BlipCaptioningModel
TEMP_PATH = '.'

bp = Blueprint('captioning', __name__, url_prefix='/')
model = BlipCaptioningModel()
@bp.route ('/testing', methods=['GET'])
def returnTest():
    response = make_response("TestTestTest", 200)
    return response
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
@bp.route('/upload', methods=['POST', 'GET'])
def upload_file():
    print ("upload route")
    print (request)
    if (request.method == 'POST') or (request.method == 'GET'):
        if request.files["file"].filename == '':
            print ('No selected file')
            return 'No selected file'
        #print (request.form["InputBox"])
        f = request.files["file"]
        fileName = TEMP_PATH + str(os.getpid()) + (request.files["file"].filename.split('.')[-1])
        f.save(fileName)
        stringPredict = model.generate_caption (fileName)
    response = make_response(stringPredict, 200)
    response.mimetype = "text/plain"
    return response 
