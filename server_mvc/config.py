# For environment thingy
from dotenv import load_dotenv
import os
from dataclasses import dataclass

@dataclass
class DatabaseConfig:
    host: str
    port: int
    database: str
    user: str
    password: str
    echo: bool

    # default values
    rdbms: str = "postgresql"
    connector: str = "psycopg2"

    @property
    def full_url(self) -> str:
        return "{}+{}://{}:{}@{}:{}/{}".format(
            self.rdbms, self.connector,
            self.user, self.password,
            self.host, self.port, self.database
        )

@dataclass
class Config:
    debug: bool
    db_config: DatabaseConfig
    secret: str
    
def load_config() -> Config:
    load_dotenv()
    
    database_config = DatabaseConfig(
        host=os.getenv('host'),
        port=os.getenv('port'),
        database=os.getenv('database'),
        user=os.getenv('user'),
        password=os.getenv('password'),
        echo=os.getenv('echo')
    )
    
    return Config(
        debug=os.getenv('debug'),
        db_config=database_config,
        secret=os.getenv('secret')
    )