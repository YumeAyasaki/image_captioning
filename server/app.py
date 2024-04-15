from flask import Flask
from flask_cors import CORS
from logging.config import dictConfig

from modules.captioning import bp as caption_bp
from modules.users import bp as user_bp
from database import db

def define_logging():
    dictConfig({
        'version': 1,
        'formatters': {'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }},
        'handlers': {'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        },
            # Log file
            'file': {
                'class': 'logging.FileHandler',
                'filename': 'app.log',
                'formatter': 'default'
            }
        },
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi', 'file']
        },
    })
    
def create_app():
    # Define logging
    define_logging()

    # Create app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    # Route/Blueprint here
    app.register_blueprint(caption_bp)
    app.register_blueprint(user_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    db.init_db()
    # navigation.init()
    print('Initialize completely...')
    app.run(debug=True)