import sys
from flask import Blueprint, jsonify, request

from modules.users.bp.user import bp as user_bp
from modules.users.bp.image import bp as image_bp

bp = Blueprint('user_overall', __name__, url_prefix='/api')

bp.register_blueprint(user_bp)
bp.register_blueprint(image_bp)