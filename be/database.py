from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL


URL_DATABASE = DATABASE_URL

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base = declarative_base()
