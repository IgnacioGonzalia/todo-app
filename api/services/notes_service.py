from models import db
from models.note import Note


class NotesService:
    @staticmethod
    def get_all_notes(status_filter=None):
        try:
            if status_filter:
                notes = Note.query.filter_by(status=status_filter).all()
            else:
                notes = Note.query.all()
            return {"success": True, "data": [note.to_dict() for note in notes]}
        except Exception as e:
            return {"success": False, "error": str(e)}

    @staticmethod
    def create_note(validated_data):
        try:
            new_note = Note(
                content=validated_data["content"],
                status=validated_data.get("status", "active"),
            )
            db.session.add(new_note)
            db.session.commit()
            return {
                "success": True,
                "data": new_note.to_dict(),
                "message": "Note created successfully",
            }
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    @staticmethod
    def delete_note(note_id):
        try:
            note = Note.query.get(note_id)
            if not note:
                return {"success": False, "error": "Note not found", "status_code": 404}

            db.session.delete(note)
            db.session.commit()
            return {"success": True, "message": f"Note {note_id} deleted successfully"}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}
