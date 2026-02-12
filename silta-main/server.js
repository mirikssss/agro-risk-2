import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from silta-main (so GEMINI_API_KEY etc. work when running from any cwd)
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Website URLs to search
const WEBSITE_URLS = [
  'https://silta-eight.vercel.app/',
  'https://silta-prototype.vercel.app/'
];

// Structured data from the website (since React apps don't render in HTML)
const TEAM_DATA = [
  { name: "Elnur Mavlonov", role: "Team Lead & Mech. Eng.", firstName: "Elnur", lastName: "Mavlonov" },
  { name: "Akmal Isfandiyorov", role: "AI Engineer", firstName: "Akmal", lastName: "Isfandiyorov" },
  { name: "Farangiz Iskandarova", role: "Designer", firstName: "Farangiz", lastName: "Iskandarova" },
  { name: "Abdumajid Adilov", role: "Software Engineer", firstName: "Abdumajid", lastName: "Adilov" }
];

const PROJECT_INFO = {
  name: "Silta",
  meaning: "Bridge in Finnish",
  description: "A mobile application that helps individuals with dementia recognize their loved ones through AI-powered face recognition",
  problem: "55 million people worldwide live with dementia, with numbers expected to triple by 2050. Dementia patients often cannot recognize even their closest family members, leading to severe anxiety, social withdrawal, and caregiver burnout.",
  solution: "Silta serves as a digital bridge, reconnecting patients with their loved ones by providing instant recognition of familiar faces, displaying names and relationships in clear, accessible text, operating entirely offline to protect user privacy.",
  techStack: "React and TypeScript for the frontend, TensorFlow Lite for on-device AI processing, SQLite for encrypted local storage, and Vite for build tooling",
  features: "Real-time face recognition using on-device AI, privacy-first architecture with no cloud dependencies, simple interface designed for accessibility, contextual information display (names and relationships), and offline functionality"
};

// Cache for website content
let websiteContentCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// Function to fetch and extract text content from website
async function fetchWebsiteContent() {
  // Return cached content if still valid
  if (websiteContentCache && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    return websiteContentCache;
  }

  try {
    const content = [];
    
    // FIRST: Try to fetch from websites (primary source)
    for (const url of WEBSITE_URLS) {
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          const html = await response.text();
          
          // Better extraction: get text from common React data attributes and meta tags
          let textContent = '';
          
          // Extract from meta tags
          const metaMatches = html.match(/<meta[^>]*content="([^"]*)"[^>]*>/gi) || [];
          metaMatches.forEach(meta => {
            const contentMatch = meta.match(/content="([^"]*)"/i);
            if (contentMatch && contentMatch[1]) {
              textContent += contentMatch[1] + ' ';
            }
          });
          
          // Extract from title
          const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
          if (titleMatch) {
            textContent += titleMatch[1] + ' ';
          }
          
          // Extract visible text (remove scripts/styles first)
          const cleanHtml = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
          
          // Extract text from HTML tags
          const tagText = cleanHtml
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          textContent += tagText;
          
          // Extract from data attributes that might contain content
          const dataMatches = cleanHtml.match(/data-[^=]*="([^"]*)"/gi) || [];
          dataMatches.forEach(data => {
            const valueMatch = data.match(/="([^"]*)"/i);
            if (valueMatch && valueMatch[1] && valueMatch[1].length > 10) {
              textContent += ' ' + valueMatch[1];
            }
          });
          
          if (textContent.trim().length > 100) {
            content.push({
              url,
              text: textContent.trim()
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
      }
    }
    
    // SECOND: Add structured data as supplement (not primary)
    let structuredText = '';
    structuredText += `${PROJECT_INFO.name} (${PROJECT_INFO.meaning}): ${PROJECT_INFO.description}. `;
    structuredText += `Problem: ${PROJECT_INFO.problem} `;
    structuredText += `Solution: ${PROJECT_INFO.solution} `;
    structuredText += `Tech Stack: ${PROJECT_INFO.techStack}. `;
    structuredText += `Features: ${PROJECT_INFO.features}. `;
    structuredText += `Team ~105 members: `;
    TEAM_DATA.forEach(member => {
      structuredText += `${member.name} (${member.role}), `;
    });
    structuredText += `All team members are from Tashkent and combine technical excellence with deep empathy for dementia patients and their families. `;
    
    if (structuredText.length > 0) {
      content.push({
        url: 'structured-data',
        text: structuredText
      });
    }
    
    websiteContentCache = content;
    cacheTimestamp = Date.now();
    return content;
  } catch (error) {
    console.error('Error fetching website content:', error);
    return websiteContentCache || [];
  }
}

// Function to check for team member questions
function findTeamMember(question) {
  const lowerQuestion = question.toLowerCase();
  
  // Check for role-based questions first
  if (lowerQuestion.includes('designer') || lowerQuestion.includes('design')) {
    return TEAM_DATA.find(m => m.role.toLowerCase().includes('design'));
  }
  if (lowerQuestion.includes('ai engineer') || (lowerQuestion.includes('ai') && lowerQuestion.includes('engineer'))) {
    return TEAM_DATA.find(m => m.role.toLowerCase().includes('ai'));
  }
  if (lowerQuestion.includes('software engineer') || (lowerQuestion.includes('software') && lowerQuestion.includes('engineer'))) {
    return TEAM_DATA.find(m => m.role.toLowerCase().includes('software'));
  }
  if (lowerQuestion.includes('team lead') || lowerQuestion.includes('lead')) {
    return TEAM_DATA.find(m => m.role.toLowerCase().includes('lead'));
  }
  
  // Check for name-based questions
  for (const member of TEAM_DATA) {
    const lowerName = member.name.toLowerCase();
    const lowerFirstName = member.firstName.toLowerCase();
    const lowerLastName = member.lastName.toLowerCase();
    
    if (lowerQuestion.includes(lowerName) || 
        lowerQuestion.includes(lowerFirstName) || 
        lowerQuestion.includes(lowerLastName)) {
      return member;
    }
  }
  
  return null;
}

// Function to find relevant content based on question
function findRelevantContent(question, websiteContent) {
  const lowerQuestion = question.toLowerCase();
  const questionWords = lowerQuestion.split(/\s+/).filter(w => w.length > 2);
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (const page of websiteContent) {
    const lowerText = page.text.toLowerCase();
    let score = 0;
    
    // Count keyword matches
    for (const word of questionWords) {
      const regex = new RegExp(word, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        score += matches.length;
      }
    }
    
    // Boost score for exact phrase matches
    if (lowerText.includes(lowerQuestion)) {
      score += 50;
    }
    
    // Boost for common question patterns
    if (lowerQuestion.includes('what') && lowerText.includes('silta')) {
      score += 20;
    }
    if (lowerQuestion.includes('who') && (lowerText.includes('team') || lowerText.includes('created'))) {
      score += 20;
    }
    if (lowerQuestion.includes('how') && (lowerText.includes('work') || lowerText.includes('step'))) {
      score += 20;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = page;
    }
  }
  
  return { bestMatch, bestScore };
}

// Function to extract answer from content
function extractAnswer(question, content) {
  if (!content || !content.text) {
    return null;
  }
  
  const lowerQuestion = question.toLowerCase();
  const text = content.text;
  const lowerText = text.toLowerCase();
  
  // Check for team member names in content
  for (const member of TEAM_DATA) {
    if (lowerText.includes(member.name.toLowerCase()) || 
        lowerText.includes(member.firstName.toLowerCase()) ||
        lowerText.includes(member.lastName.toLowerCase())) {
      // Try to find context around the name
      const nameIndex = lowerText.indexOf(member.name.toLowerCase());
      if (nameIndex !== -1) {
        const start = Math.max(0, nameIndex - 100);
        const end = Math.min(text.length, nameIndex + member.name.length + 200);
        const context = text.substring(start, end).trim();
        if (context.length > 50) {
          return context;
        }
      }
    }
  }
  
  // Try to find relevant sentences/paragraphs
  const sentences = text.split(/[.!?]\s+/).filter(s => s.length > 20);
  
  // Find sentences that contain question keywords
  const questionWords = lowerQuestion.split(/\s+/).filter(w => w.length > 2);
  const relevantSentences = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    return questionWords.some(word => lowerSentence.includes(word));
  });
  
  if (relevantSentences.length > 0) {
    // Return the most relevant sentences (up to 3)
    const answer = relevantSentences.slice(0, 3).join('. ') + '.';
    return answer.length > 500 ? answer.substring(0, 500) + '...' : answer;
  }
  
  // Fallback: find section with highest keyword density
  const sections = text.match(/.{1,300}/g) || [];
  let bestSection = null;
  let bestScore = 0;
  
  for (const section of sections) {
    const lowerSection = section.toLowerCase();
    let score = 0;
    for (const word of questionWords) {
      if (lowerSection.includes(word)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }
  
  return bestSection || text.substring(0, 500) + '...';
}

// AgroRisk AI: chat (Gemini) and TTS (Deepgram) — load from same folder as server.js (works from any cwd)
let handleChat, handleTts;
try {
  const chatPath = pathToFileURL(join(__dirname, 'dist-server', 'api', 'ai', 'chat.js')).href;
  const ttsPath = pathToFileURL(join(__dirname, 'dist-server', 'api', 'ai', 'tts.js')).href;
  const chatMod = await import(chatPath);
  const ttsMod = await import(ttsPath);
  handleChat = chatMod.handleChat;
  handleTts = ttsMod.handleTts;
  const ttsKind = process.env.DEEPGRAM_API_KEY ? 'Deepgram (key set)' : 'Deepgram (DEEPGRAM_API_KEY missing!)';
  console.log('AgroRisk AI: /api/ai/chat and /api/ai/tts loaded. TTS:', ttsKind);
} catch (e) {
  console.warn('AgroRisk AI routes NOT loaded (run "npm run build:server" from silta-main):', e.message);
}

// Import the handler functions from the API routes
const getChatbotResponse = async (question) => {
  try {
    const lowerQuestion = question.toLowerCase();
    
    // FIRST: Try to fetch and search website content (primary source)
    const websiteContent = await fetchWebsiteContent();
    const { bestMatch, bestScore } = findRelevantContent(question, websiteContent);
    
    // Use website content if we have any reasonable match (lower threshold)
    if (bestMatch && bestScore > 0) {
      const answer = extractAnswer(question, bestMatch);
      if (answer && answer.length > 30) {
        return answer;
      }
    }
    
    // SECOND: Check for team member questions (structured data)
    const teamMember = findTeamMember(question);
    if (teamMember) {
      return `${teamMember.name} is the ${teamMember.role} in Team ~105. ${teamMember.name} is part of the multidisciplinary team from Tashkent that created Silta, combining technical excellence with deep empathy for the challenges faced by dementia patients and their families.`;
    }
    
    // Handle "who is designer" type questions
    if (lowerQuestion.includes('who') && (lowerQuestion.includes('designer') || lowerQuestion.includes('design'))) {
      const designer = TEAM_DATA.find(m => m.role.toLowerCase().includes('design'));
      if (designer) {
        return `${designer.name} is the ${designer.role} in Team ~105. ${designer.name} is part of the multidisciplinary team from Tashkent that created Silta.`;
      }
    }
    
    // Check for specific project information
    if (lowerQuestion.includes('name') && (lowerQuestion.includes('project') || lowerQuestion.includes('app'))) {
      return `Our project is called "${PROJECT_INFO.name}", which means "${PROJECT_INFO.meaning}". We chose this name because Finland has the highest dementia rate in the world, and our app serves as a digital bridge, reconnecting patients with their loved ones.`;
    }
    
    // THIRD: Fallback to rule-based if no good match found

  // Team/Developers questions - check first before other "who" questions
  if (lowerQuestion.includes('team') || lowerQuestion.includes('developer') || lowerQuestion.includes('who made') || lowerQuestion.includes('creator') || lowerQuestion.includes('who are') || lowerQuestion.includes('who created')) {
    return "Silta was created by Team ~105, a multidisciplinary team from Tashkent including mechanical engineers, AI specialists, and product designers. Our team combines technical excellence with deep empathy for the challenges faced by dementia patients and their families.";
  }

  // Project name questions
  if (lowerQuestion.includes('name') && (lowerQuestion.includes('project') || lowerQuestion.includes('app') || lowerQuestion.includes('product'))) {
    return "Our project is called 'Silta', which means 'Bridge' in Finnish. We chose this name because Finland has the highest dementia rate in the world, and our app serves as a digital bridge, reconnecting patients with their loved ones.";
  }

  // What does your project do?
  if ((lowerQuestion.includes('what does') || lowerQuestion.includes('what is') || lowerQuestion.includes('what\'s')) && (lowerQuestion.includes('project') || lowerQuestion.includes('product') || lowerQuestion.includes('app'))) {
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

  // General "what" questions about the project
  if (lowerQuestion.includes('what') && (lowerQuestion.includes('project') || lowerQuestion.includes('silta') || lowerQuestion.includes('app'))) {
    return "Silta is a mobile application that helps individuals with dementia recognize their loved ones through AI-powered face recognition. The app uses on-device AI to identify faces in real-time and displays the person's name and relationship. It operates entirely offline to protect user privacy and is designed with accessibility in mind for users with cognitive impairments.";
  }

    return "I'm here to help you learn about Silta! You can ask me about what the project does, who it's for, how it works, features, privacy, technology, or availability. What would you like to know?";
  } catch (error) {
    console.error('Error in getChatbotResponse:', error);
    return "I'm here to help you learn about Silta! You can ask me about what the project does, who it's for, how it works, features, privacy, technology, or availability. What would you like to know?";
  }
};

const getAIResponse = async (question) => {
  try {
    const lowerQuestion = question.toLowerCase();
    
    // FIRST: Try to fetch and search website content (primary source)
    const websiteContent = await fetchWebsiteContent();
    const { bestMatch, bestScore } = findRelevantContent(question, websiteContent);
    
    // Use website content if we have any reasonable match (lower threshold)
    if (bestMatch && bestScore > 0) {
      const answer = extractAnswer(question, bestMatch);
      if (answer && answer.length > 30) {
        return answer;
      }
    }
    
    // SECOND: Check for team member questions (structured data)
    const teamMember = findTeamMember(question);
    if (teamMember) {
      return `${teamMember.name} is the ${teamMember.role} in Team ~105. ${teamMember.name} is part of the multidisciplinary team from Tashkent that created Silta, combining technical excellence with deep empathy for the challenges faced by dementia patients and their families.`;
    }
    
    // Handle "who is designer" type questions
    if (lowerQuestion.includes('who') && (lowerQuestion.includes('designer') || lowerQuestion.includes('design'))) {
      const designer = TEAM_DATA.find(m => m.role.toLowerCase().includes('design'));
      if (designer) {
        return `${designer.name} is the ${designer.role} in Team ~105. ${designer.name} is part of the multidisciplinary team from Tashkent that created Silta.`;
      }
    }
    
    // Check for specific project information
    if (lowerQuestion.includes('name') && (lowerQuestion.includes('project') || lowerQuestion.includes('app'))) {
      return `Our project is called "${PROJECT_INFO.name}", which means "${PROJECT_INFO.meaning}". We chose this name because Finland has the highest dementia rate in the world, and our app serves as a digital bridge, reconnecting patients with their loved ones.`;
    }
    
    // THIRD: Fallback to rule-based if no good match found

  // Team/Developers questions
  if (lowerQuestion.includes('team') || lowerQuestion.includes('developer') || lowerQuestion.includes('who made') || lowerQuestion.includes('creator') || lowerQuestion.includes('who are') || lowerQuestion.includes('who created')) {
    return "Silta was created by Team ~105, a multidisciplinary team from Tashkent including mechanical engineers, AI specialists, and product designers. Our team combines technical excellence with deep empathy for the challenges faced by dementia patients and their families.";
  }

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

    return "Silta uses AI-powered face recognition to help dementia patients identify their loved ones. The system processes facial features locally on the device using TensorFlow Lite, ensuring privacy and offline functionality. If you have a specific question about our AI implementation, technology stack, or features, please ask!";
  } catch (error) {
    console.error('Error in getAIResponse:', error);
    return "Silta uses AI-powered face recognition to help dementia patients identify their loved ones. The system processes facial features locally on the device using TensorFlow Lite, ensuring privacy and offline functionality. If you have a specific question about our AI implementation, technology stack, or features, please ask!";
  }
};

// Chatbot endpoint
app.post('/api/chatbot', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid question in the request body.' });
    }

    const answer = await getChatbotResponse(question);

    return res.status(200).json({
      answer,
      question,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// AgroRisk AI endpoints (optional; require build:server and env keys)
if (handleChat) {
  app.post('/api/ai/chat', (req, res) => {
    console.log('[AgroRisk AI] POST /api/ai/chat');
    handleChat(req, res).catch((err) => {
      console.error('[AgroRisk AI] chat error:', err);
      if (!res.headersSent) res.status(500).json({ error: 'Chat failed.' });
    });
  });
}
if (handleTts) {
  app.post('/api/ai/tts', (req, res) => {
    console.log('[AgroRisk AI] POST /api/ai/tts');
    handleTts(req, res).catch((err) => {
      console.error('[AgroRisk AI] TTS error:', err);
      if (!res.headersSent) res.status(500).json({ error: 'TTS failed.' });
    });
  });
}

// API Ask endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid question in the request body.' });
    }

    const answer = await getAIResponse(question);

    return res.status(200).json({
      answer,
      question,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available:`);
  console.log(`   POST http://localhost:${PORT}/api/chatbot`);
  console.log(`   POST http://localhost:${PORT}/api/ask`);
});

