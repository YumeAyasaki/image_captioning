from flask import Flask

from infrastructure.config import load_config
from infrastructure.log import configure_logging
from infrastructure.database.session import create_session_maker
import middlewares
import routes

def main() -> Flask:
    config = load_config()
    configure_logging(config.app_config)
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