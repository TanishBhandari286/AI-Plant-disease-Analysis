"""
AgroVision Database Configuration and Models
Using SQLAlchemy with PostgreSQL
"""

import os
import uuid
from datetime import datetime

from sqlalchemy import create_engine, Column, DateTime, Text, ARRAY, String
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import sessionmaker, declarative_base

# Database Configuration - Use DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


class Consultation(Base):
    """
    Consultation Model - Stores the complete disease detection session data.
    
    This model captures the entire "Visual Model -> Thinking Model" pipeline,
    including the AI's reasoning process and final diagnosis.
    """
    __tablename__ = "consultations"

    # Primary Key - UUID for unique session identification
    session_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    
    # Timestamp for consultation creation
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    
    # Farmer Information (Name, Village, GPS Coordinates)
    # Example: {"name": "Rajesh Kumar", "village": "Baramati", "coordinates": {"lat": 18.15, "lng": 74.58}}
    farmer_metadata = Column(
        JSONB,
        nullable=True
    )
    
    # Crop Details (Crop Name, Sown Date, User Observations)
    # Example: {"crop_name": "Apple", "sown_date": "2025-06-15", "observations": "Yellow spots on leaves"}
    crop_metadata = Column(
        JSONB,
        nullable=True
    )
    
    # Summarized Weather Context from historical data
    # Example: "Heavy rain last 7 days, avg humidity 85%, temp range 22-28°C"
    weather_context = Column(
        Text,
        nullable=True
    )
    
    # CRITICAL: AI Diagnosis Log - The "Thinking Process"
    # Stores comparison notes between user image and Golden Reference images
    # Example: {
    #   "initial_prediction": "Apple Scab",
    #   "reference_image_used": "refs/apple_scab.jpg",
    #   "visual_match_score": 0.87,
    #   "comparison_notes": "Olive-brown lesions match reference. Velvety texture confirmed.",
    #   "weather_correlation": "High humidity supports fungal growth hypothesis",
    #   "confidence_adjustment": "+0.05 due to weather correlation"
    # }
    ai_diagnosis_log = Column(
        JSONB,
        nullable=True
    )
    
    # Final Diagnosis Result
    # Example: {
    #   "disease_name": "Apple Scab",
    #   "confidence_score": 0.92,
    #   "severity": "moderate",
    #   "treatment_plan": {
    #     "immediate": ["Remove infected leaves", "Apply fungicide spray"],
    #     "preventive": ["Improve air circulation", "Avoid overhead irrigation"],
    #     "products": ["Mancozeb 75% WP", "Captan 50% WP"]
    #   }
    # }
    final_result = Column(
        JSONB,
        nullable=True
    )
    
    # Public URLs of uploaded images stored in GCS
    # Example: ["https://storage.googleapis.com/agrovision-uploads/session123/img1.jpg"]
    image_urls = Column(
        ARRAY(String),
        nullable=True
    )
    
    # Chat History - Stores conversation history for stateful chat
    # Example: [{"role": "user", "content": "Why scab?"}, {"role": "assistant", "content": "Because..."}]
    chat_history = Column(
        JSONB,
        default=[],
        nullable=True
    )

    def __repr__(self):
        return f"<Consultation(session_id={self.session_id}, created_at={self.created_at})>"


# Dependency for FastAPI - Database Session
def get_db():
    """
    FastAPI dependency that provides a database session.
    Ensures proper cleanup after request completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create all tables
def init_db():
    """
    Initialize the database by creating all tables.
    Call this on application startup.
    """
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    # For testing: Create tables when running directly
    init_db()
    print("Database tables created successfully!")
