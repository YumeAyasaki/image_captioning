from flask import Flask

from infrastructure.log import configure_logging
from infrastructure.database.session import create_session_maker
import middlewares
import routes
from config import load_config

def main() -> Flask:
    # config = load_config()
    config = load_config()
    configure_logging(config)
    session_maker = create_session_maker(config.db_config.full_url)

    app = Flask(__name__)

    middlewares.register(app, session_maker)
    routes.register(app)

    return app


def run():
    app = main()
    app.run("localhost", 5000, debug=True)


if __name__ == "__main__":
    run()