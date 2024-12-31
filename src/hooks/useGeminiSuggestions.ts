import { useState } from 'react';
import { generateScheduleSuggestions } from '../services/gemini';
import useTeacherStore from '../store/useTeacherStore';
import useScheduleStore from '../store/useScheduleStore';

export const useGeminiSuggestions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const teachers = useTeacherStore(state => state.teachers);
  const schedule = useScheduleStore(state => state.schedule);
  const setSchedule = useScheduleStore(state => state.setSchedule);

  const getSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const suggestions = await generateScheduleSuggestions(teachers, schedule);
      if (suggestions) {
        setSchedule(suggestions);
      }
    } catch (err) {
      setError('Failed to generate suggestions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { getSuggestions, loading, error };
};