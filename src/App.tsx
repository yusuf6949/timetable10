import React from 'react';
import { useAuth } from './components/auth/AuthProvider';
import { School } from 'lucide-react';
import TeacherForm from './components/TeacherForm';
import TeacherList from './components/TeacherList';
import Schedule from './components/Schedule';
import GenerateScheduleButton from './components/GenerateScheduleButton';
import GeminiSuggestionsButton from './components/GeminiSuggestionsButton';
import ThemeToggle from './components/ThemeToggle';
import LoginScreen from './components/auth/LoginScreen';
import useTeacherStore from './store/useTeacherStore';
import useScheduleStore from './store/useScheduleStore';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { teachers, clearTeachers } = useTeacherStore();
  const setSchedule = useScheduleStore(state => state.setSchedule);

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors">
      <header className="bg-school-green text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <School className="h-12 w-12 text-school-gold" />
              <div>
                <h1 className="text-2xl font-bold">KHSK TimeTable</h1>
                <p className="text-sm text-school-gold">"Learn to Excel"</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {teachers.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure about clearing all teachers?')) {
                      clearTeachers();
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/10 rounded-md transition-colors"
                >
                  Clear All Teachers
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark p-6">
              <h2 className="text-xl font-semibold text-school-green dark:text-white mb-6">
                Add Teacher
              </h2>
              <TeacherForm />
            </div>
            
            {teachers.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark p-6">
                <TeacherList />
              </div>
            )}
          </div>

          <div className="space-y-8">
            {teachers.length > 0 && (
              <>
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-card dark:shadow-card-dark p-6 flex gap-4">
                  <GenerateScheduleButton />
                  <GeminiSuggestionsButton />
                </div>
                <Schedule />
              </>
            )}
          </div>
        </div>
      </main>
      {/* Rest of the component remains unchanged */}
    </div>
  );
};

export default App;