# 📄 Resume Builder – AI-Powered Resume Generation Platform

![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Status](https://img.shields.io/badge/status-production%20ready-blue)

---

## 🚀 Project Overview

**ResumeAI** is a **full-stack web application** that empowers users to create professional, ATS-friendly resumes with **AI-powered analysis** and export them in multiple formats.
The platform combines **Node.js**, **Python**, and **React** with Google Gemini AI to deliver smart insights, templates, and real-time previews.

### ✨ Core Highlights

- 🤖 **AI-Powered Resume Analysis** (Google Gemini Pro)
- 🌈 **11+ Professional Templates** with real-time preview
- 📊 **Resume Scoring & Feedback**
- 📄 **Multi-format Export** (PDF, DOCX, TXT)
- ⚡ **Real-time Collaboration** _(future enhancement)_
- 🔒 **Secure Authentication & Storage**

---

## 🛠️ Tech Stack

### **Frontend**

- React 18 + TypeScript
- Vite + TailwindCSS + Radix UI
- React Router 6
- Lucide React Icons
- Framer Motion (Animations)
- TanStack Query (Data Fetching)
- Custom Toast Notifications (Sonner)

### **Backend (Node.js)**

- Express.js
- MongoDB + Mongoose
- JWT Authentication + bcryptjs
- Puppeteer (PDF Generation)
- Multer + fs-extra (File Handling)
- dotenv + CORS Middleware

### **Backend (Python – AI/ML)**

- Flask
- PyMongo
- Google Gemini Pro API
- NLP: spaCy + NLTK
- AI/ML: scikit-learn + Hugging Face Transformers
- Text Analysis: textstat
- Parsing: PyMuPDF + python-docx
- Visualization: matplotlib + plotly

---

## 📂 Project Structure

```bash
resumebuilder/
├── client/             # React Frontend
├── server/             # Node.js Backend
├── python_backend/     # Python AI Backend
├── shared/             # Shared Utilities & Types
├── public/             # Static Assets
└── README.md           # Documentation
```

📌 Detailed file structure with **pages, components, routes, services, and schemas** is available in the full documentation.

---

## 🗄️ Database Models (MongoDB)

### **Users**

```json
{
  "username": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "createdAt": "Date"
}
```

### **Resumes**

```json
{
  "userId": "ObjectId",
  "title": "string",
  "template": "string",
  "status": "draft|published",
  "data": { "personalInfo": {}, "education": [], "experience": [] }
}
```

### **Resume Analyses (Python Backend)**

```json
{
  "user_id": "ObjectId",
  "gemini_analysis": {
    "overall_score": "number",
    "strengths": [],
    "weaknesses": [],
    "recommendations": []
  }
}
```

---

## 🔗 API Endpoints

### **Auth**

- `POST /api/auth/register` → Register User
- `POST /api/auth/login` → Login User
- `GET /api/auth/profile` → Get User Profile

### **Resume**

- `POST /api/resumes` → Create Resume
- `GET /api/resumes` → Get All Resumes
- `PUT /api/resumes/:id` → Update Resume
- `DELETE /api/resumes/:id` → Delete Resume

### **AI Analysis (Python)**

- `POST /api/resume/upload` → Upload & Analyze Resume
- `GET /api/resume/analyze/:id` → Get Analysis Results
- `GET /api/resume/history` → Get Analysis History

---

## ⚡ Features

- 📝 **Interactive Resume Builder** (multi-step forms, auto-save, validation)
- 🎨 **Template Library** (Modern, Classic, Creative, Executive, Technical, LaTeX, etc.)
- 🤖 **AI Resume Scoring** with recommendations
- 📄 **PDF Export via Puppeteer** with professional typography
- 🔐 **JWT-based Authentication & Role Protection**
- 📊 **Analytics Dashboard** _(future enhancement)_

---

## 💚 Development Setup

### **Frontend**

```bash
cd client
npm install
npm run dev
```

### **Node.js Backend**

```bash
cd server
npm install
npm run dev
```

### **Python Backend**

```bash
cd python_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### **Environment Variables**

```env
# Node.js
MONGO_URI=mongodb://localhost:27017/resume_builder
JWT_SECRET_KEY=your-secret
GEMINI_API_KEY=your-gemini-api-key

# Python
MONGO_URI=mongodb://localhost:27017/resume_builder_ml
JWT_SECRET_KEY=your-secret
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🚀 Deployment

Recommended stack:

- **Frontend:** Vercel / Netlify
- **Node.js Backend:** Render / Railway / Heroku
- **Python Backend:** Docker + Render / Railway
- **Database:** MongoDB Atlas
- **Storage/CDN:** AWS S3 + Cloudflare

---

## 📈 Roadmap

- ✅ Resume Builder Core
- ✅ PDF Export + AI Analysis
- ✅ Authentication System
- ⏳ Real-time Collaboration
- ⏳ Mobile App (React Native)
- ⏳ Advanced Analytics
- ⏳ GPT-4 AI Integration

---

## 🛡️ Security

- JWT Authentication
- Bcrypt Password Hashing
- Input Validation (Zod)
- CORS Configuration
- File Upload Validation

---

## 📞 Contributing & Support

👨‍💻 **Team Roles:**

- Frontend: React/TypeScript
- Backend: Node.js/Express
- AI/ML: Python/Gemini AI
- DevOps: Docker/Deployment

📬 For issues, feature requests, or contributions:

- Create a GitHub issue or pull request
- Contact: **[rdpatel.dev@gmail.com](mailto:rdpatel.dev@gmail.com)**

---

## 📝 Status

- **Version:** v1.0.0
- **Last Updated:** Jan 2025
- **Stage:** ✅ Production Ready

---

✨ Built with ❤️ using MERN + Python + Google Gemini Pro

![Dashboard Preview](https://raw.githubusercontent.com/rajpatel676/resumebuilder/main/image.png)
