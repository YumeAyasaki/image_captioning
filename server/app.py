from flask import Flask
from flask_cors import CORS
from flask import Flask
from flask import url_for
from flask import render_template
from flask import request, make_response
from flask import send_file
from logging.config import dictConfig
#from flask_wtf.csrf import CSRFProtect
from modules.captioning import bp
import os
#app = Flask(__name__)
#csrf = CSRFProtect()
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
    #csrf.init_app(app)
    CORS(app)

    # Route/Blueprint here
    app.register_blueprint(bp)
    #csrf.exempt(bp)
    return app

app = create_app()
@app.route('/', methods=['GET', 'POST'])
def hello():
    return render_template('index.html')
@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)

def get_bp_urls(blueprint):
    from flask import Flask
    temp_app = Flask(__name__) 
    temp_app.register_blueprint(blueprint)
    return [str(p) for p in temp_app.url_map.iter_rules()]
a = get_bp_urls(bp)
print (a)
if __name__ == '__main__':
    print('Initialize completely...')
    app.run(debug=True)
