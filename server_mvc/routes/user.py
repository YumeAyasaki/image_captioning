from flask import Blueprint, g, request, jsonify

from controllers.user import UserController
from schemas.user import UserCreate

user_blueprint = Blueprint("user", __name__, url_prefix="/user")

@user_blueprint.route("/register/", methods=['POST'])
def register():
    session = g.session
    user_controller = UserController(session)
    
    try:
        data = request.get_json()
        user_data = UserCreate(**data)
        user_controller.create_user(user_data)
        return jsonify({'msg': 'Người dùng đã được tạo thành công.'}), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400