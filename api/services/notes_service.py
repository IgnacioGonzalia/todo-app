import json
from models.note import Note, db


def backup_notes_to_file(filepath="backup.json"):
    notes = Note.query.all()
    notes_data = [note.to_dict() for note in notes]
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(notes_data, f, indent=2, ensure_ascii=False)
    return filepath


def get_notes(status=None):
    if status:
        return Note.query.filter_by(status=status).all()
    return Note.query.all()


def create_note(content, status="active"):
    new_note = Note(content=content, status=status)
    db.session.add(new_note)
    db.session.commit()
    return new_note


def delete_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return None
    db.session.delete(note)
    db.session.commit()
    return note
