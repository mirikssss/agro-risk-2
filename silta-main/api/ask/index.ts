import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rule-based AI response system for Silta questions
const getAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();

  // AI-related questions
  if (lowerQuestion.includes('ai') || lowerQuestion.includes('artificial intelligence') || lowerQuestion.includes('how does your project use ai')) {
    return "Our project uses AI to analyze facial features in real-time using TensorFlow Lite models. The AI generates unique facial embeddings for each person, enabling instant recognition. All processing happens on-device using quantized models (< 15MB), ensuring privacy and offline functionality. The AI compares live camera input against stored facial fingerprints to identify individuals and display their names and relationships.";
  }

  // Technology questions
  if (lowerQuestion.includes('technology') || lowerQuestion.includes('tech stack') || lowerQuestion.includes('stack')) {
    return "Our tech stack includes React and TypeScript for the frontend, TensorFlow Lite for on-device AI processing, SQLite for encrypted local storage, and Vite for build tooling. We use quantized neural network models optimized for mobile devices, ensuring fast and private face recognition without cloud dependencies.";
  }

  // Recognition questions
  if (lowerQuestion.includes('recogn') || lowerQuestion.includes('identif') || lowerQuestion.includes('face')) {
    return "Silta uses advanced face recognition technology powered by TensorFlow Lite. When you point the camera at someone, the AI analyzes facial features and generates a unique embedding. This embedding is compared against stored facial fingerprints in the local database. When a match is found, the app displays the person's name and relationship in large, accessible text.";
  }

  // Privacy questions
  if (lowerQuestion.includes('privacy') || lowerQuestion.includes('secure') || lowerQuestion.includes('data')) {
    return "Privacy is our top priority. All facial recognition processing happens locally on your device - no photos or facial data ever leave your phone. We use encrypted local storage (SQLite) to store facial fingerprints. There are zero cloud dependencies for recognition, ensuring complete privacy for vulnerable users.";
  }

  // Problem/solution questions
  if (lowerQuestion.includes('problem') || lowerQuestion.includes('solve') || lowerQuestion.includes('help')) {
    return "Silta solves the problem of face recognition for dementia patients. When someone with dementia can't recognize their loved ones, it causes severe anxiety and social withdrawal. Our app bridges this gap by providing instant recognition of familiar faces, displaying names and relationships, and reducing patient anxiety while improving social interactions.";
  }

  // General project questions
  if (lowerQuestion.includes('project') || lowerQuestion.includes('what') || lowerQuestion.includes('silta')) {
    return "Silta is a mobile application that helps individuals with dementia recognize their loved ones through AI-powered face recognition. The app uses on-device AI to identify faces in real-time and displays the person's name and relationship. It operates entirely offline to protect user privacy and is designed with accessibility in mind for users with cognitive impairments.";
  }

  // Default response
  return "Silta uses AI-powered face recognition to help dementia patients identify their loved ones. The system processes facial features locally on the device using TensorFlow Lite, ensuring privacy and offline functionality. If you have a specific question about our AI implementation, technology stack, or features, please ask!";
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid question in the request body.' });
    }

    const answer = getAIResponse(question);

    return res.status(200).json({
      answer,
      question,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

