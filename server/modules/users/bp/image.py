import sys
from flask import Blueprint, jsonify, request

from modules.users.models.image import Image
from utils.config import SECRET_KEY
from database import db
from utils.auth import token_required

bp = Blueprint('image', __name__, url_prefix='/image')

@bp.route('/', methods=['GET'])
@token_required
def get_all(user):
    # Get all images from user
    images = db.query(Image, {'user_id': user.id})
    return jsonify({'images': [image.to_dict() for image in images]})

@bp.route('/add/', methods=['POST'])
@token_required
def add(user):
    data = request.get_json()
    image = Image(data)
    image.user_id = user.id
    db.save(image)
    return jsonify({'message': 'Thêm ảnh thành công.'})

@bp.route('/delete/<int:id>', methods=['DELETE'])
@token_required
def delete(user, id):
    image = db.query(Image, {'id': id})
    if image is None or image == []:
        return jsonify({'message': 'Ảnh không tồn tại.'}), 400
    image = image[0]
    if image.user_id != user.id:
        return jsonify({'message': 'Bạn không có quyền xóa ảnh này.'}), 400
    db.delete(image)
    return jsonify({'message': 'Xóa ảnh thành công.'})