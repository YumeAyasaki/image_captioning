from flask import Blueprint, g, request, jsonify

from controllers.image import ImageController
from dto.image import ImageCreate, ImageUpdate
from utils.auth import token_required

image_blueprint = Blueprint("image", __name__, url_prefix="/image")

@image_blueprint.route('/', methods=['GET'])
@token_required
def get_all(user):
    session = g.session
    image_controller = ImageController(session)
    images = image_controller.get_all_from_user(user)
    return jsonify({'images': [image.model_dump(mode='json') for image in images]}), 201

@image_blueprint.route('/add/', methods=['POST'])
@token_required
def add(user):
    session = g.session
    image_controller = ImageController(session)
    try:
        data = request.get_json()
        image_data = ImageCreate(**data)
        image_controller.add(image_data, user)
        return jsonify({'msg': 'Thêm ảnh thành công.'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@image_blueprint.route('/<string:image_id>/', methods=['PUT'])
@token_required
def edit(user, image_id):
    session = g.session
    image_controller = ImageController(session)
    try:
        data = request.get_json()
        image_data = ImageUpdate(**data)
        image_controller.edit(image_id, image_data, user)
        return jsonify({'msg': 'Sửa ảnh thành công.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@image_blueprint.route('/delete/<string:image_id>/', methods=['DELETE'])
@token_required
def delete(user, image_id):
    print ("DEWLETE")
    session = g.session
    image_controller = ImageController(session)
    print ("DEWLETE")
    try:
        image_controller.delete(image_id, user)
        print ("DEWLETE")
        response = jsonify({'msg': 'Xóa ảnh thành công.'})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@image_blueprint.route('/all/', methods=['GET']) # Sorry if it doesn't make sense, me neither
def get_all_global():
    session = g.session
    image_controller = ImageController(session)
    images = image_controller.get_all()
    return jsonify({'images': [image.model_dump(mode='json') for image in images]}), 201

@image_blueprint.route('/<string:image_id>/', methods=['GET'])
def get_one_global(image_id):
    session = g.session
    image_controller = ImageController(session)
    image = image_controller.get_one(image_id)
    response = jsonify({'image': image.model_dump(mode='json')})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 201
