from fastapi import FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session
from typing import Optional, List
from sqlalchemy import Column
from sqlalchemy.types import JSON


app = FastAPI()
sqlite_file = "database.db"
engine = create_engine(f"sqlite:///{sqlite_file}", echo=True)

class Resident(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    room: str

class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    resident_id: int
    content: str
    summary: Optional[str] = None
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))


@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def read_root():
    return {"message":"Care Notes API is alive!"}

# endpoints ()
@app.get("/residents", response_model=List[Resident])
def list_residents():
    with Session(engine) as session:
        return session.exec(Resident.select()).all()
