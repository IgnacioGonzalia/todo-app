from flask import Blueprint, request, jsonify
from marshmallow import Schema, fields, validate, ValidationError
from services.notes_service import (
    backup_notes_to_file,
    get_notes,
    create_note,
    delete_note,
)

notes_bp = Blueprint("notes", __name__)


class NoteSchema(Schema):
    content = fields.String(required=True, validate=validate.Length(min=1, max=200))
    status = fields.String(
        required=False, validate=validate.OneOf(["active", "completed"])
    )


note_schema = NoteSchema()


@notes_bp.post("/notes/backup")
def handle_backup_notes():
    path = backup_notes_to_file()
    return jsonify({"status": "success", "message": f"Backup saved at {path}"})


@notes_bp.get("/notes")
def handle_get_notes():
    status = request.args.get("status")
    notes = get_notes(status)
    return jsonify({"notes": [note.to_dict() for note in notes]})


@notes_bp.post("/notes")
def handle_create_note():
    data = request.get_json()

    try:
        validated_data = note_schema.load(data)
    except ValidationError as err:
        return jsonify({"status": "error", "errors": err.messages}), 400

    new_note = create_note(
        content=validated_data["content"], status=validated_data.get("status", "active")
    )

    return jsonify(
        {
            "status": "success",
            "message": "Note created successfully",
            "data": new_note.to_dict(),
        }
    )


@notes_bp.delete("/notes/<int:note_id>")
def handle_delete_note(note_id):
    note = delete_note(note_id)
    if not note:
        return jsonify({"status": "error", "error": "Note not found"}), 404

    return jsonify(
        {"status": "success", "message": f"Note {note_id} deleted successfully"}
    )
