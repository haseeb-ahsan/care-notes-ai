from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import Optional, List
from sqlalchemy import Column
from sqlalchemy.types import JSON
from ai_utils import summarize_and_tag
from datetime import datetime 

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# database setup
database_file = "database.db"
engine = create_engine(f"sqlite:///{database_file}", echo=True)


class Resident(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    room: str

# Base fields shared across create/update/response
class NoteBase(SQLModel):
    resident_id: int
    content: str
    summary: Optional[str] = None
    tags: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)  
    author: Optional[str] = None  

# POST note payload
class NoteCreate(NoteBase):
    pass

# Full DB Note model
class Note(NoteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


@app.get("/")
def read_root():
    return {"message": "Care Notes API is alive!"}


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

@app.put("/residents/{resident_id}", response_model=Resident)
def update_resident(resident_id: int, updated: Resident):
    with Session(engine) as session:
        res = session.get(Resident, resident_id)
        if not res:
            raise HTTPException(status_code=404, detail="Resident not found")
        res.first_name = updated.first_name
        res.last_name = updated.last_name
        res.room = updated.room
        session.add(res)
        session.commit()
        session.refresh(res)
        return res

@app.delete("/residents/{resident_id}")
def delete_resident(resident_id: int):
    with Session(engine) as session:
        resident = session.get(Resident, resident_id)
        if not resident:
            raise HTTPException(status_code=404, detail="Resident not found")
        # delete notes for resident
        notes = session.exec(select(Note).where(Note.resident_id == resident_id)).all()
        for n in notes:
            session.delete(n)
        session.delete(resident)
        session.commit()
    return {"ok": True}


@app.get("/notes/{resident_id}", response_model=List[Note])
def get_notes(resident_id: int):
    with Session(engine) as session:
        return session.exec(
            select(Note).where(Note.resident_id == resident_id)
        ).all()

@app.post("/notes", response_model=Note)
async def create_note(note_in: NoteCreate):
    # AI summary/tags
    ai = await summarize_and_tag(note_in.content)

    note = Note(
        resident_id=note_in.resident_id,
        content=note_in.content,
        summary=ai["summary"],
        tags=ai["tags"],
        author=note_in.author, 
        created_at=note_in.created_at  # will default to now if not set
    )

    with Session(engine) as session:
        session.add(note)
        session.commit()
        session.refresh(note)
        return note

@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: int, note: Note):
    with Session(engine) as session:
        db_note = session.get(Note, note_id)
        if not db_note:
            raise HTTPException(status_code=404, detail="Note not found")

        db_note.content = note.content
        db_note.summary = note.summary
        db_note.tags = note.tags
        db_note.author = note.author  
        session.add(db_note)
        session.commit()
        session.refresh(db_note)
        return db_note

@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    with Session(engine) as session:
        note = session.get(Note, note_id)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        session.delete(note)
        session.commit()
    return {"ok": True}
