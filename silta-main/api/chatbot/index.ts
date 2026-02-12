import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rule-based chatbot with predefined answers for Silta
const getChatbotResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();

  // What does your project do?
  if (lowerQuestion.includes('what does') && (lowerQuestion.includes('project') || lowerQuestion.includes('product') || lowerQuestion.includes('app'))) {
    return "Our project helps users with dementia recognize their loved ones by providing real-time face recognition. It automates the identification of familiar faces and displays names and relationships, reducing anxiety and improving social interactions for dementia patients. The app operates entirely offline to protect user privacy.";
  }

  // Who is this product for?
  if (lowerQuestion.includes('who') && (lowerQuestion.includes('product') || lowerQuestion.includes('for') || lowerQuestion.includes('target'))) {
    return "This product is designed for individuals with dementia and their families, including people experiencing face recognition difficulties. For example, a person with dementia who cannot recognize their grandchildren can use Silta to instantly identify them and see their relationship. Caregivers and family members can also benefit by reducing stress and improving communication with their loved ones.";
  }

  // How does it work?
  if (lowerQuestion.includes('how') && (lowerQuestion.includes('work') || lowerQuestion.includes('use'))) {
    return "Silta works in four simple steps: 1) A caregiver sets up the app and uploads photos of key people, 2) The app creates facial fingerprints locally on the device, 3) When the patient opens the app and points the camera, 4) The AI recognizes faces and displays names and relationships in large, accessible text. All processing happens on-device for privacy.";
  }

  // Features
  if (lowerQuestion.includes('feature') || lowerQuestion.includes('capability') || lowerQuestion.includes('can it')) {
    return "Silta's key features include: real-time face recognition using on-device AI, privacy-first architecture with no cloud dependencies, simple interface designed for accessibility, contextual information display (names and relationships), and offline functionality. The app works entirely on your device without internet connection.";
  }

  // Privacy/Security
  if (lowerQuestion.includes('privacy') || lowerQuestion.includes('secure') || lowerQuestion.includes('data') || lowerQuestion.includes('private')) {
    return "Privacy is fundamental to Silta. All facial recognition happens locally on your device - no photos or data ever leave your phone. We use encrypted local storage and zero cloud dependencies for recognition. This ensures complete privacy for vulnerable users and their families.";
  }

  // Technology
  if (lowerQuestion.includes('technology') || lowerQuestion.includes('tech') || lowerQuestion.includes('built')) {
    return "Silta is built using React and TypeScript for the frontend, TensorFlow Lite for on-device AI processing, and SQLite for encrypted local storage. We use quantized neural network models optimized for mobile devices, ensuring fast recognition while maintaining privacy.";
  }

  // Cost/Pricing
  if (lowerQuestion.includes('cost') || lowerQuestion.includes('price') || lowerQuestion.includes('free') || lowerQuestion.includes('paid')) {
    return "Silta is currently in the prototype phase. Our roadmap includes a free version for individual users and potential premium features for care facilities. We're committed to making this technology accessible to those who need it most.";
  }

  // Availability
  if (lowerQuestion.includes('when') || lowerQuestion.includes('available') || lowerQuestion.includes('release') || lowerQuestion.includes('launch')) {
    return "Silta is currently in the prototype stage. We're planning a closed beta with 50 families in Tashkent in Q1 2026, followed by public launch on App Store and Play Store in Q2 2026. You can try our web prototype now at silta-prototype.vercel.app";
  }

  // Problem it solves
  if (lowerQuestion.includes('problem') || lowerQuestion.includes('solve') || lowerQuestion.includes('issue')) {
    return "Silta solves the devastating problem of face recognition loss in dementia patients. When someone can't recognize their loved ones, it causes severe anxiety, social withdrawal, and caregiver burnout. Our app bridges this gap by providing instant recognition, reducing patient anxiety, and improving family connections.";
  }

  // Team
  if (lowerQuestion.includes('team') || lowerQuestion.includes('who made') || lowerQuestion.includes('creator')) {
    return "Silta was created by Team ~105, a multidisciplinary team from Tashkent including mechanical engineers, AI specialists, and product designers. Our team combines technical excellence with deep empathy for the challenges faced by dementia patients and their families.";
  }

  // Default response
  return "I'm here to help you learn about Silta! You can ask me about what the project does, who it's for, how it works, features, privacy, technology, or availability. What would you like to know?";
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

    const answer = getChatbotResponse(question);

    return res.status(200).json({
      answer,
      question,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

