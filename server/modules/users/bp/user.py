import sys
from flask import Blueprint, jsonify, request
import jwt

from modules.users.models.user import User
from utils.config import SECRET_KEY
from database import db

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route('/register/', methods=['POST'])
def register():
    data = request.get_json()

    if data['password'] != data['rePassword']:
        return jsonify({'message': 'Mật khẩu không trùng khớp.'}), 400
    
    filters = {
        'username': data['username'],
    }
    user = db.query(User, filters)
    if user is not None and user != []:
        return jsonify({'message': 'Tài khoản đã tồn tại.'}), 400
    
    try:
        user = User(data)
    except AssertionError:
        print(sys.exc_info()[1].args[0])
        # to_string
        return jsonify({'message': 'Thông tin người dùng không phù hợp.', 'detailed': sys.exc_info()[1].args[0]}), 400
    
    try:
        db.save(user)
    except NameError:
        print(sys.exc_info()[0])
        db.rollback()
        return jsonify({'message': 'Đăng ký thất bại.'}), 400

    return jsonify({'message': 'Đăng ký thành công.'}), 201


@bp.route('/login/', methods=['POST'])
def login():
    data = request.get_json(force=True)
    print ("/login/ data: ",data)
    filters = {
        'username': data['username'],
    }
    print ("/login/ filters: ",data)
    try:
        user = db.query(User, filters)
    except NameError:
        print(sys.exc_info()[0])
        return jsonify({'message': 'Đăng nhập thất bại.'}), 400

    if user is None or user == []:
        return jsonify({'message': 'Tài khoản không tồn tại.'}), 400

    user = user[0]

    if not user.check_password(data['password']):
        return jsonify({'message': 'Sai mật khẩu.'}), 400

    token = jwt.encode({
        'id': user.id,
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Đăng nhập thành công.', 'token': token, 'user': user.simple_user()}), 201

