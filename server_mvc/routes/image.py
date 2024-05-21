from flask import Blueprint, g, request, jsonify

from controllers.image import ImageController
from schemas.image import Image, ImageCreate, ImageUpdate
from utils.auth import token_required

image_blueprint = Blueprint("image", __name__, url_prefix="/image")

@image_blueprint.route('/', methods=['GET'])
@token_required
def get_all(user):
    session = g.session
    image_controller = ImageController(session)
    images = image_controller.get_all(user)
    return jsonify({'images': images}), 201

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
    
@image_blueprint.route('/<string:image_id>', methods=['PUT'])
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

@image_blueprint.route('/<string:image_id>', methods=['DELETE'])
@token_required
def delete(user, image_id):
    session = g.session
    image_controller = ImageController(session)
    try:
        image_controller.delete(image_id, user)
        return jsonify({'msg': 'Xóa ảnh thành công.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400