from flask import Flask, g

from infrastructure.log import configure_logging
from infrastructure.database.session import create_session_maker
import middlewares
import routes
from config import load_config
from controllers.captioning import CaptioningController

from flask_cors import CORS, cross_origin

def main() -> Flask:
    # config = load_config()
    config = load_config()
    print (config)
    print (config.db_config)
    configure_logging(config)
    session_maker = create_session_maker(config.db_config.full_url)

    app = Flask(__name__)
    cors = CORS(app)
    middlewares.register(app, session_maker)
    routes.register(app)
    print ([str(p) for p in app.url_map.iter_rules()])
    return app


def run():
    app = main()
    app.run("localhost", 5000, debug=True)


if __name__ == "__main__":
    run()
