from flask import jsonify, request, g
from functools import wraps

from controllers.user import UserController

def token_required(func):
    @wraps(func)
    def wrapped_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]
        else:
            return jsonify({'message': 'Header không chứa Authorization.'}), 401
        if not token or token == 'null':
            return jsonify({'message': 'Không tìm thấy token.'}), 401

        session = g.session
        user_controller = UserController(session)
        
        current_user = user_controller.get_user_from_token(token)
        
        return func(current_user, *args, **kwargs)
    
    return wrapped_function