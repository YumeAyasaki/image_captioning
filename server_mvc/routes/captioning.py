from flask import Blueprint, request, jsonify, make_response
import datetime

from utils.translate import translate_sentence
from controllers.captioning import CaptioningController

caption_blueprint = Blueprint("caption", __name__, url_prefix="/caption")
model = CaptioningController()

@caption_blueprint.route('/url/', methods=['POST'])
def generate_caption_url():
    # model = g.model
    # Get the image URL from the request
    image_url = request.json['image_url']
    # Get current time stamp
    time = datetime.datetime.now()
    # Generate the caption
    caption = model.generate_caption_from_url(image_url)
    translated_caption = translate_sentence(caption)
    time_to_generate = datetime.datetime.now() - time
    # Return the caption as JSON
    return jsonify({'caption': caption, 'translated_caption': translated_caption, 'time_to_generate': time_to_generate.total_seconds()})

@caption_blueprint.route('/upload', methods=['POST', 'GET'])
def upload_file():
    if (request.method == 'POST') or (request.method == 'GET'):
        #if request.files["file"].filename == '':
        #    print ('No selected file')
        #    return 'No selected file'
        #print (request.form["InputBox"])
        #f phai la base64
        f = request.json["file"]
        #print (request.form.to_dict()["file"])
        #fileName = TEMP_PATH + str(os.getpid())  +'.'+ (request.files["file"].filename.split('.')[-1])
        #, encoding='utf-8')
        #f.save(fileName)
        # model = g.model
        print (f)
        stringPredict = model.generate_caption (f.split(',')[1])
        stringPredict = translate_sentence(stringPredict)
        #stringPredict = "testString"
    response = make_response(stringPredict, 200)
    response.mimetype = "text/plain"
    return response 

@caption_blueprint.route('/image/', methods=['POST'])
def generate_caption_image():
    # Get the image from the request
    data = request.get_json()
    image = data['image'].split(",")[1]
    # Get current time stamp
    time = datetime.datetime.now()
    # Generate the caption
    # model = g.model
    caption = model.generate_caption(image)
    translated_caption = translate_sentence(caption)
    time_to_generate = datetime.datetime.now() - time
    # Return the caption as JSON
    return jsonify({'caption': caption, 'translated_caption': translated_caption, 'time_to_generate': time_to_generate.total_seconds()})