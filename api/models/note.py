from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Note(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), default="active")

    def to_dict(self):
        return {"id": self.id, "content": self.content, "status": self.status}
