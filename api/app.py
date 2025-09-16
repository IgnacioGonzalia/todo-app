import logging
import os
from flask import Flask
from models import db
from routes.notes import notes_bp


# Basic logging configuration
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


def create_app():
    app = Flask(__name__)

    # DB configuration - use PostgreSQL at production, SQLite at development
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        # Production (Railway with PostgreSQL)
        app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    else:
        # Local development (SQLite)
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///notes.db"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize DB with app
    db.init_app(app)

    # Middleware before every request
    @app.before_request
    def log_request_info():
        from flask import request

        logging.info(f"Request: {request.method} {request.path}")

    # Middleware after every request
    @app.after_request
    def log_response_info(response):
        from flask import request

        logging.info(f"Response: {request.method} {request.path} -> {response.status}")
        return response

    # Register blueprints
    app.register_blueprint(notes_bp)

    # Initialize DB tables
    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    # Use Railway port at production, 5000 at development
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
