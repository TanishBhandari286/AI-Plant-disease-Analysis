"""
AgroVision Pydantic Schemas
Input/Output validation and Disease Reference Mapping
"""

from enum import Enum
from typing import Optional, List, Dict, Any
from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, Field


# =============================================================================
# ENUMS
# =============================================================================

class CropEnum(str, Enum):
    """Supported crop types for disease detection."""
    APPLE = "Apple"
    RICE = "Rice"
    TOMATO = "Tomato"


# =============================================================================
# DISEASE REFERENCE MAP - Golden Reference Images
# =============================================================================
# Maps Disease Name -> Reference Image Filename in GCS bucket
# These are used for the "Thinking Model" comparison step

DISEASE_REFERENCE_MAP: Dict[str, str] = {
    # Apple Diseases
    "Apple Scab": "refs/apple/apple_scab",
    "Black Rot": "refs/apple/black_rot",
    "Cedar Apple Rust": "refs/apple/cedar_apple_rust",
    "Apple Healthy": "refs/apple/healthy",
    
    # Rice Diseases
    "Rice Bacterial Leaf Blight": "refs/rice/bacterial_leaf_blight",
    "Rice Brown Spot": "refs/rice/brown_spot",
    "Rice Healthy": "refs/rice/healthy",
    "Rice Leaf Blast": "refs/rice/leaf_blast",
    "Rice Leaf Scald": "refs/rice/leaf_scald",
    "Rice Narrow Brown Spot": "refs/rice/narrow_brown_spot",
    
    # Tomato Diseases
    "Tomato Bacterial Spot": "refs/Tomato Leaf Disease/tomato-bacterial-spot",
    "Tomato Early Blight": "refs/Tomato Leaf Disease/tomato-early-bright",
    "Tomato Healthy": "refs/Tomato Leaf Disease/tomato-healthy",
    "Tomato Late Blight": "refs/Tomato Leaf Disease/tomato-late-blight",
    "Tomato Leaf Mould": "refs/Tomato Leaf Disease/tomato-leaf-mould",
    "Tomato Septoria Leaf Spot": "refs/Tomato Leaf Disease/tomato-septoria_leaf_spot",
    "Tomato Spider Mites": "refs/Tomato Leaf Disease/tomato-spider-mites-two-spotted-spider-mite",
    "Tomato Target Spot": "refs/Tomato Leaf Disease/tomato-target-spot",
    "Tomato Yellow Leaf Curl Virus": "refs/Tomato Leaf Disease/tomato-yellow-leaf-curl-virus",
    "Tomato Mosaic Virus": "refs/Tomato Leaf Disease/tomato_mosaic_virus",
}

# Reverse mapping: Get diseases by crop type
DISEASES_BY_CROP: Dict[str, List[str]] = {
    "Apple": [
        "Apple Scab", 
        "Black Rot", 
        "Cedar Apple Rust", 
        "Apple Healthy"
    ],
    "Rice": [
        "Rice Bacterial Leaf Blight",
        "Rice Brown Spot",
        "Rice Healthy",
        "Rice Leaf Blast",
        "Rice Leaf Scald",
        "Rice Narrow Brown Spot"
    ],
    "Tomato": [
        "Tomato Bacterial Spot",
        "Tomato Early Blight",
        "Tomato Healthy",
        "Tomato Late Blight",
        "Tomato Leaf Mould",
        "Tomato Septoria Leaf Spot",
        "Tomato Spider Mites",
        "Tomato Target Spot",
        "Tomato Yellow Leaf Curl Virus",
        "Tomato Mosaic Virus"
    ],
}


# =============================================================================
# NESTED SCHEMAS
# =============================================================================

class Coordinates(BaseModel):
    """GPS coordinates for farmer location."""
    lat: float = Field(..., ge=-90, le=90, description="Latitude")
    lng: float = Field(..., ge=-180, le=180, description="Longitude")


class FarmerMetadata(BaseModel):
    """Farmer identification and location information."""
    name: str = Field(..., min_length=1, max_length=100, description="Farmer's name")
    village: str = Field(..., min_length=1, max_length=100, description="Village name")
    coordinates: Optional[Coordinates] = Field(None, description="GPS coordinates")


class CropMetadata(BaseModel):
    """Crop details provided by the farmer."""
    crop_name: CropEnum = Field(..., description="Type of crop")
    sown_date: Optional[date] = Field(None, description="Date when crop was sown")
    observations: Optional[str] = Field(
        None, 
        max_length=500, 
        description="Farmer's observations about the issue"
    )


class TreatmentPlan(BaseModel):
    """Structured treatment recommendations."""
    immediate: List[str] = Field(default_factory=list, description="Immediate actions to take")
    preventive: List[str] = Field(default_factory=list, description="Preventive measures")
    products: List[str] = Field(default_factory=list, description="Recommended products")


class FinalResult(BaseModel):
    """Final diagnosis output from the AI pipeline."""
    disease_name: str = Field(..., description="Identified disease name")
    confidence_score: float = Field(..., ge=0, le=1, description="Confidence score (0-1)")
    severity: Optional[str] = Field(None, description="Severity level: mild, moderate, severe")
    treatment_plan: Optional[TreatmentPlan] = Field(None, description="Treatment recommendations")


class AIDiagnosisLog(BaseModel):
    """
    The 'Thinking Process' - captures the AI's reasoning.
    Records comparison between user image and Golden Reference.
    """
    initial_prediction: str = Field(..., description="Initial disease prediction from visual model")
    reference_image_used: str = Field(..., description="Path to the reference image used")
    visual_match_score: float = Field(..., ge=0, le=1, description="Visual similarity score")
    comparison_notes: str = Field(..., description="Detailed comparison observations")
    weather_correlation: Optional[str] = Field(None, description="How weather data supports/contradicts diagnosis")
    confidence_adjustment: Optional[str] = Field(None, description="Adjustments made based on context")


# =============================================================================
# API INPUT SCHEMAS
# =============================================================================

class ConsultationCreate(BaseModel):
    """
    Input schema for creating a new disease detection consultation.
    This is the main API input for the /consult endpoint.
    """
    farmer_metadata: FarmerMetadata = Field(..., description="Farmer information")
    crop_metadata: CropMetadata = Field(..., description="Crop details")
    
    class Config:
        json_schema_extra = {
            "example": {
                "farmer_metadata": {
                    "name": "Rajesh Kumar",
                    "village": "Baramati",
                    "coordinates": {"lat": 18.15, "lng": 74.58}
                },
                "crop_metadata": {
                    "crop_name": "Apple",
                    "sown_date": "2025-06-15",
                    "observations": "Yellow and brown spots appearing on leaves, spreading quickly"
                }
            }
        }


# =============================================================================
# API RESPONSE SCHEMAS
# =============================================================================

class ConsultationResponse(BaseModel):
    """Response schema for a consultation."""
    session_id: UUID
    created_at: datetime
    farmer_metadata: Optional[Dict[str, Any]] = None
    crop_metadata: Optional[Dict[str, Any]] = None
    weather_context: Optional[str] = None
    ai_diagnosis_log: Optional[Dict[str, Any]] = None
    final_result: Optional[Dict[str, Any]] = None
    image_urls: Optional[List[str]] = None

    class Config:
        from_attributes = True


class ConsultationSummary(BaseModel):
    """Lightweight response for listing consultations."""
    session_id: UUID
    created_at: datetime
    crop_name: Optional[str] = None
    disease_name: Optional[str] = None
    confidence_score: Optional[float] = None

    class Config:
        from_attributes = True


class HealthCheckResponse(BaseModel):
    """Health check endpoint response."""
    status: str = "healthy"
    database: str = "connected"
    storage: str = "connected"
