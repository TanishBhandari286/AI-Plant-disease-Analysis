<p align="center">
  <img src="https://img.shields.io/badge/AI-Powered-emerald?style=for-the-badge&logo=openai&logoColor=white" alt="AI Powered"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</p>

<h1 align="center">🌱 AgroVision</h1>

<p align="center">
  <strong>AI-Powered Crop Disease Detection & Diagnosis Platform</strong>
  <br/>
  <em>Empowering farmers with instant, accurate plant health analysis</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#api-reference">API</a>
</p>

---

## 🎯 Overview

AgroVision is a modern agricultural technology platform that leverages advanced AI vision models to help farmers identify crop diseases instantly. Simply upload photos of your crops, and receive comprehensive diagnosis reports with treatment recommendations.

<p align="center">
  <img src="https://img.shields.io/badge/Accuracy-95%25+-success?style=flat-square" alt="Accuracy"/>
  <img src="https://img.shields.io/badge/Response_Time-<5s-blue?style=flat-square" alt="Response Time"/>
  <img src="https://img.shields.io/badge/Crops_Supported-10+-orange?style=flat-square" alt="Crops"/>
</p>

## ✨ Features

### 🔬 **AI-Powered Diagnosis**
- **GPT-4 Vision Analysis** — Advanced image recognition for accurate disease identification
- **Multi-Image Support** — Upload up to 3 images for comprehensive analysis
- **Confidence Scoring** — Get confidence levels for each diagnosis

### 🌾 **Crop Support**
- Rice, Wheat, Cotton, Sugarcane
- Maize, Soybean, Groundnut
- Tomato, Potato, Chili
- And more...

### 💬 **Interactive Features**
- **Follow-up Chat** — Ask questions about your diagnosis with AI-powered responses
- **Treatment Plans** — Receive detailed treatment recommendations
- **Preventive Measures** — Learn how to prevent future outbreaks

### 📍 **Smart Features**
- **Geolocation Support** — Regional disease pattern insights
- **History Tracking** — Access past consultations
- **Offline-Ready** — Progressive web app capabilities

### 🎨 **Premium UI/UX**
- Glassmorphism design with smooth animations
- Framer Motion transitions
- Mobile-first responsive design
- Dark/Light theme support

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance async API framework |
| **Python 3.12** | Modern Python with type hints |
| **PostgreSQL** | Reliable relational database |
| **SQLAlchemy** | ORM for database operations |
| **OpenAI GPT-4o** | Vision model for disease detection |
| **Google Gemini** | Secondary AI for chat responses |
| **Google Cloud Storage** | Secure image storage |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | Latest React with concurrent features |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Fluid animations |
| **Lucide Icons** | Beautiful icon set |
| **React Hot Toast** | Elegant notifications |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Nginx** | Reverse proxy & static serving |
| **Supervisor** | Process management |

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- Python 3.12+ (for local development)
- PostgreSQL database
- OpenAI API key
- Google Cloud Storage bucket

### Environment Setup

Create `.env` in the backend directory:

```env
# Database
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agrovision

# AI Services
OPENAI_API_KEY=sk-your-openai-key
GEMINI_API_KEY=your-gemini-key

# Storage
GCS_BUCKET_NAME=your-bucket-name
GOOGLE_CLOUD_CREDENTIALS_BASE64=<base64-encoded-service-account-json>
```

### Local Development

**Backend:**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install -r pyproject.toml
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Access the app at `http://localhost:5173`

## 🐳 Deployment

### Docker (Single Container)

The included Dockerfile creates an all-in-one container with nginx + backend:

```bash
# Build
docker build -t agrovision .

# Run
docker run -d \
  -p 80:80 \
  -e DB_HOST=your-db-host \
  -e DB_PASSWORD=your-password \
  -e OPENAI_API_KEY=sk-xxx \
  -e GCS_BUCKET_NAME=your-bucket \
  -e GOOGLE_CLOUD_CREDENTIALS_BASE64=xxx \
  agrovision
```

### Dokploy / Railway / Render

1. Connect your GitHub repository
2. Set the root Dockerfile as build source
3. Configure environment variables in the dashboard
4. Deploy!

**Required Environment Variables:**
| Variable | Description |
|----------|-------------|
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port (default: 5432) |
| `DB_NAME` | Database name |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o |
| `GEMINI_API_KEY` | Google Gemini API key (optional, for chat) |
| `GCS_BUCKET_NAME` | Google Cloud Storage bucket name |
| `GOOGLE_CLOUD_CREDENTIALS_BASE64` | Base64-encoded GCS service account JSON |

### Getting Base64 Credentials

```bash
cat your-service-account.json | base64 -w 0
```

## 📡 API Reference

### Health Check
```http
GET /health
```

### Create Consultation
```http
POST /consultations
Content-Type: multipart/form-data

images[]: File (up to 3)
crop_name: string
farmer_name: string (optional)
latitude: float (optional)
longitude: float (optional)
```

### Get Consultation
```http
GET /consultations/{consultation_id}
```

### Chat with AI
```http
POST /consultations/{consultation_id}/chat
Content-Type: application/json

{
  "message": "How do I treat this disease?"
}
```

## 📁 Project Structure

```
agrovision/
├── backend/
│   ├── app/
│   │   ├── database.py      # Database models & connection
│   │   └── schemas.py       # Pydantic schemas & crop data
│   ├── main.py              # FastAPI application
│   ├── Dockerfile           # Backend container
│   └── pyproject.toml       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── index.css        # Global styles
│   │   └── assets/          # Static assets
│   ├── Dockerfile           # Frontend container
│   └── package.json         # Node dependencies
├── Dockerfile               # Combined production build
├── .gitignore
└── README.md
```

## 🔒 Security

- All credentials are handled via environment variables
- GCS credentials are base64-decoded at runtime
- CORS is configurable for production
- No secrets are committed to the repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with 💚 for farmers everywhere
</p>
