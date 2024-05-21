import logging

from config import Config
from infrastructure.log.formatters import MainConsoleFormatter

DEFAULT_LOGGING_LEVEL: int = logging.INFO

def configure_logging(config: Config) -> None:
    logging_level: int = logging.DEBUG if config.debug else DEFAULT_LOGGING_LEVEL

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging_level)
    console_handler.setFormatter(MainConsoleFormatter())

    logging.basicConfig(handlers=[console_handler], level=logging_level)
