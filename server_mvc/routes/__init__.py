from flask import Flask, Blueprint, jsonify

from .user import user_blueprint
from .image import image_blueprint
from .captioning import caption_blueprint

def register(app: Flask) -> None:
    bp = Blueprint('overall', __name__, url_prefix='/api')
    # Bonus
    @bp.route('/', methods=['GET'])
    def get():
        return jsonify({'message': 'Connect'}), 201

    bp.register_blueprint(user_blueprint)
    bp.register_blueprint(image_blueprint)
    bp.register_blueprint(caption_blueprint)
    
    app.register_blueprint(bp)