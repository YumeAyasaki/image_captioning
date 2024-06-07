from flask import Blueprint, g, request, jsonify
from pydantic import ValidationError

from controllers.user import UserController
from dto.user import UserCreate, UserLogin
from utils.auth import token_required

user_blueprint = Blueprint("user", __name__, url_prefix="/user")

@user_blueprint.route("/register/", methods=['POST'])
def register():
    session = g.session
    user_controller = UserController(session)
    
    try:
        data = request.get_json()
        if data['password'] != data['rePassword']:
            return jsonify({'message': 'Mật khẩu không trùng khớp.'}), 400
        data.pop('rePassword', None)
        user_data = UserCreate(**data)
        user_controller.create_user(user_data)
        return jsonify({'message': 'Người dùng đã được tạo thành công.'}), 201
    except ValidationError as e:
        error_messages = []
        for error in e.errors():
            field = error['loc'][0] if error['loc'] else 'general'
            message = error['msg']
            error_messages.append(f"{field}: {message}")

        return jsonify({'message': '\n'.join(error_messages)}), 400
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    
@user_blueprint.route('/login/', methods=['POST'])
def login():
    session = g.session
    user_controller = UserController(session)
    
    try:
        data = request.get_json()
        user_data = UserLogin(**data)
        user, token = user_controller.login(user_data)
        return jsonify({'message': 'Đăng nhập thành công.', 'token': token, 'user': user.model_dump(mode='json')}), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    
@user_blueprint.route('/', methods=['GET'])
@token_required
def get_user(user):
    return jsonify({'user': user.model_dump(mode='json')}), 201

@user_blueprint.route('/logout/', methods=['GET'])
def logout():
    return jsonify({'msg': 'What do you expect here?'}), 201
