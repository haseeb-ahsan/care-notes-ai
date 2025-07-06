from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import Optional, List
from sqlalchemy import Column
from sqlalchemy.types import JSON


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        return session.exec(select(Resident)).all()

@app.post("/residents", response_model=Resident)
def create_resident(resident: Resident):
    with Session(engine) as session:
        session.add(resident)
        session.commit()
        session.refresh(resident)
        return resident

@app.get("/notes/{resident_id}", response_model=List[Note])
def get_notes(resident_id: int):
    with Session(engine) as session:
        statement = select(Note).where(Note.resident_id == resident_id)
        return session.exec(statement).all()

@app.post("/notes", response_model=Note)
def create_note(note: Note):
    with Session(engine) as session:
        session.add(note)
        session.commit()
        session.refresh(note)
        return note
