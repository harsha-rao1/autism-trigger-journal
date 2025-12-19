# Autism Sensory Trigger Journal (Video-Assisted)

**Privacy-preserving video-assisted sensory trigger journal with AI pattern detection to help caregivers identify environmental triggers for autism-related sensory sensitivities.**

## 🎯 Problem Statement

Parents and educators struggle to identify consistent sensory triggers causing meltdowns or withdrawal in children with autism. Traditional text-based journaling is time-consuming and often misses subtle environmental patterns that only become visible when analyzed systematically over time.

## 💡 Solution Overview

A digital journaling app where caregivers:
- **Upload short video clips** (30-90 seconds) capturing the environment and context
- **Log structured metadata**: Activity, location, observed stress level, duration
- **Receive AI-powered insights**: Pattern detection surfaces correlations between environmental factors (noise, light, crowd) and behavioral responses

**Key Design Principles:**
- ✅ **Privacy-first**: Raw video can be deleted after feature extraction; no facial recognition
- ✅ **Caregiver-in-the-loop**: AI assists, doesn't diagnose
- ✅ **Explainable insights**: Transparent correlations, not black-box predictions
- ✅ **Ethical & research-aligned**: Supports behavioral research and data-driven intervention design

## ✨ Features

### Completed (Demo UI)
- 🎥 **Video upload interface** with preview
- 📝 **Structured journal entry form** (activity, location, stress level, notes)
- 📊 **Patterns & Insights dashboard** showing:
  - Top sensory trigger patterns
  - Explainable correlations (noise, brightness, crowd motion)
  - Per-child sensory profiles
- 📅 **Entry timeline** with visual stress indicators
- 👤 **Multi-child profile support**
- 🔒 **Privacy consent flow** and ethics messaging
- 🎨 **Accessible, caregiver-friendly UI**

### To Be Implemented

#### Backend (FastAPI)
- [ ] REST API endpoints for entries, patterns, profiles
- [ ] Video upload handling and storage (encrypted)
- [ ] Database schema (SQLite/PostgreSQL)
- [ ] Authentication & authorization
- [ ] File management (auto-delete after processing)

#### Video Processing Pipeline
- [ ] **Audio feature extraction** (librosa):
  - Volume levels (dB)
  - Noise spikes detection
  - Frequency band analysis
- [ ] **Visual environment features** (OpenCV):
  - Brightness/flicker detection
  - Motion density (crowd movement)
  - Color intensity analysis
- [ ] **Behavioral motion analysis** (MediaPipe):
  - Body motion intensity
  - Repetitive movement detection
  - Movement pattern tracking
- [ ] **Privacy safeguards**:
  - No facial recognition
  - Feature extraction → delete raw video option
  - Encrypted storage if video must be retained

#### ML Layer (Scikit-learn)
- [ ] Feature vector construction from extracted signals
- [ ] K-means clustering for pattern grouping
- [ ] Correlation analysis (environment ↔ stress)
- [ ] Pattern surfacing algorithms
- [ ] Export anonymized datasets for research

#### Integration & Testing
- [ ] Connect frontend to backend API
- [ ] End-to-end video processing flow
- [ ] ML pipeline testing with sample data
- [ ] Privacy compliance verification
- [ ] Performance optimization

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Vite |
| **Backend** | Python (FastAPI) - *To be implemented* |
| **Video Processing** | OpenCV, Librosa - *To be implemented* |
| **Pose Detection** | MediaPipe - *To be implemented* |
| **ML/AI** | Scikit-learn - *To be implemented* |
| **Database** | SQLite (prototype) / PostgreSQL - *To be implemented* |
| **Security** | Encrypted file storage - *To be implemented* |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+ (for backend, when implemented)

### Frontend Setup (Current)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

### Backend Setup (To Be Implemented)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn opencv-python librosa mediapipe scikit-learn

# Run server
uvicorn main:app --reload
```

## 📁 Project Structure

```
autism-trigger-journal/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Frontend dependencies
├── README.md            # This file
└── [backend/]           # To be created
    ├── main.py          # FastAPI app
    ├── models/          # Database models
    ├── api/             # API endpoints
    ├── ml/              # ML processing pipeline
    └── video/           # Video processing utilities
```

## 🔐 Privacy & Ethics

This project follows responsible AI principles:

- **No facial recognition**: Only body motion and environmental features are analyzed
- **Anonymized features**: Raw video can be deleted after feature extraction
- **Caregiver control**: All labeling and consent is caregiver-driven
- **Not diagnostic**: Tool assists pattern recognition, does not diagnose autism
- **Research-aligned**: Designed to support behavioral research and intervention design

## 🎓 Academic Value

- Supports behavioral research and data-driven intervention design
- Demonstrates privacy-preserving AI for sensitive healthcare applications
- Showcases explainable ML (transparent correlations vs black-box models)
- Caregiver-in-the-loop design pattern

## 🚧 Roadmap

### Phase 1: MVP (Current)
- ✅ Demo UI with mock data
- ⏳ Backend API skeleton
- ⏳ Basic video upload handling

### Phase 2: Core Features
- ⏳ Video processing pipeline
- ⏳ Feature extraction (audio, visual, motion)
- ⏳ Database integration
- ⏳ ML clustering implementation

### Phase 3: Advanced Features
- ⏳ Real-time pattern detection
- ⏳ Export functionality for research
- ⏳ Multi-environment comparison (home vs school)
- ⏳ Personalized intervention suggestions

### Phase 4: Production Ready
- ⏳ IRB-ready consent flow
- ⏳ Security audit
- ⏳ Performance optimization
- ⏳ User testing with caregivers

## 📝 Contributing

This is a research/educational project. Contributions should:
- Maintain privacy-first principles
- Follow ethical AI guidelines
- Include clear documentation
- Respect caregiver and child privacy

## 📄 License

[Specify your license here]

## 🙏 Acknowledgments

Built with care for caregivers, educators, and researchers working to support children with autism and sensory sensitivities.

---

**Note**: This is a prototype/demo. The current UI uses simulated data for demonstration purposes. Full implementation requires backend, ML pipeline, and video processing components.
