import { GoogleGenerativeAI } from '@google/generative-ai';
import { Teacher, Schedule } from '../types';

let genAI: GoogleGenerativeAI;

const initializeGenAI = async () => {
  let apiKey;
  
  if (window.electron) {
    // Running in Electron
    apiKey = await window.electron.getApiKey();
  } else {
    // Running in browser
    apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  }
  
  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }

  genAI = new GoogleGenerativeAI(apiKey);
};

export const generateScheduleSuggestions = async (
  teachers: Teacher[],
  currentSchedule: Schedule
): Promise<Schedule | null> => {
  try {
    if (!genAI) {
      await initializeGenAI();
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `As an AI timetable optimization expert, analyze this school schedule:

Teachers: ${teachers.length}
Classes: ${Object.keys(currentSchedule).length}

Current workload distribution:
${teachers.map(t => `- ${t.name}: ${t.periodsAssigned} periods`).join('\n')}

Optimize for:
1. Equal teaching load distribution
2. Subject timing (sciences in morning)
3. Teacher preferences and availability
4. Stream separation

Provide specific suggestions for improvement.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log('Gemini suggestions:', response.text());
    return currentSchedule; // Return current schedule for now
  } catch (error) {
    console.error('Error generating suggestions:', error);
    throw new Error('Failed to generate schedule suggestions');
  }
};