# Silta Demo

## Demo Recording

**Status:** Please record a demo video (1-5 minutes) showing:
- Key features of the Silta app
- Face recognition in action
- User interface and navigation
- How the app helps dementia patients recognize loved ones

**Video Requirements:**
- Minimum 1 minute, maximum 5 minutes
- Show key flows and features
- Optional: 1-minute pitch at the beginning

**Where to upload:** Upload the video to YouTube, Vimeo, or similar platform and update this file with the link.

---

## Description

### What is Being Shown

Silta is a mobile application designed to help individuals with dementia recognize their loved ones through AI-powered face recognition. The demo showcases:

1. **Real-time Face Recognition**: The app uses the device camera to identify faces in real-time
2. **Contextual Information Display**: When a face is recognized, the app displays the person's name and relationship to the user
3. **Privacy-First Architecture**: All facial recognition processing happens locally on the device
4. **Simple, Accessible Interface**: Large text and high-contrast design optimized for users with cognitive impairments

### How It Relates to Problem and Solution

**The Problem:**
- 55 million people worldwide live with dementia, with numbers expected to triple by 2050
- Dementia patients often cannot recognize even their closest family members
- This leads to severe anxiety, social withdrawal, and caregiver burnout
- Finland has the highest dementia rate in the world, inspiring our name "Silta" (Bridge in Finnish)

**Our Solution:**
Silta serves as a digital bridge, reconnecting patients with their loved ones by:
- Providing instant recognition of familiar faces
- Displaying names and relationships in clear, accessible text
- Operating entirely offline to protect user privacy
- Reducing patient anxiety and improving social interactions

### Stack, Technologies, and AI Solutions Used

**Frontend:**
- React 18.2.0 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Vite as build tool
- Lucide React for icons

**AI/ML Technologies:**
- TensorFlow Lite for mobile-optimized face recognition
- Quantized models (< 15MB size) for efficient on-device processing
- Real-time vector embedding generation
- Local facial fingerprint storage (SQLite)

**Architecture:**
- Edge AI processing (no cloud dependencies for recognition)
- Offline-first design
- Encrypted local storage
- Cross-platform ready (React Native planned for mobile deployment)

**Deployment:**
- Vercel for web hosting
- Serverless architecture

### Roadmap Stage

**Current Stage: Prototype**

We are currently in the **Prototype** phase, having completed:
- ✅ Core face recognition engine development
- ✅ UI/UX design and implementation
- ✅ Web-based prototype demonstration
- ✅ Basic API endpoints for chatbot and AI interactions

**Next Steps:**
1. **Q1 2026 - MVP Pilot**: Closed beta testing with 50 families in Tashkent
   - Integration of voice note features
   - Performance optimization
   - User feedback collection

2. **Q2 2026 - Public Launch**: Official release on App Store & Play Store
   - Central Asian market deployment
   - Partnership with local health clinics
   - Marketing and user acquisition

3. **2027 - Global Expansion**: 
   - Localization for European markets (starting with Finland)
   - Enterprise API for care homes
   - Advanced features and analytics

---

## Live Access

**Live Application URL:** https://silta-prototype.vercel.app/

**Access Details:**
- No authorization required
- Fully functional prototype
- Test the face recognition features with sample images
- Navigate through all sections of the application

**Note:** The live application is a web-based prototype. The full mobile app with native camera integration will be available in the MVP phase.

---

## Bonus Features

### 1. Chatbot

We've implemented an API-based chatbot that can answer questions about Silta.

**Endpoint:** `POST /api/chatbot`

**Example Request:**
```json
{
  "question": "What does your project do?"
}
```

**Example Response:**
```json
{
  "answer": "Our project helps users with dementia recognize their loved ones by providing real-time face recognition. It automates the identification of familiar faces and displays names and relationships, reducing anxiety and improving social interactions for dementia patients."
}
```

### 2. API Access

We've implemented an AI-powered API endpoint that demonstrates how the system interacts with AI services.

**Endpoint:** `POST /api/ask`

**Example Request:**
```json
{
  "question": "How does your project use AI?"
}
```

**Example Response:**
```json
{
  "answer": "Our project uses AI to analyze facial features in real-time using TensorFlow Lite models. The AI generates unique facial embeddings for each person, enabling instant recognition. All processing happens on-device using quantized models (< 15MB), ensuring privacy and offline functionality. The AI compares live camera input against stored facial fingerprints to identify individuals and display their names and relationships."
}
```

**Try it yourself:**
```bash
curl -X POST https://silta-prototype.vercel.app/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "How does your project use AI?"}'
```

