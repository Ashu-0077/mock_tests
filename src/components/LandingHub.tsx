import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { examRegistry, getCategoryLabel } from '../data/exams';
import { ExamAttempt } from '../types';

interface LandingHubProps {
  onSelectExam: (examId: string) => void;
  recentAttempts: ExamAttempt[];
}

export const LandingHub = ({ onSelectExam, recentAttempts }: LandingHubProps) => {
  const categories = Array.from(new Set(examRegistry.map((exam) => exam.category)));
  const recentExam = recentAttempts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ExamHub
            </h1>
          </div>
          <p className="text-slate-300 text-lg">Master competitive exams with AI-powered practice</p>
        </div>

        {recentExam && (
          <div className="mb-12 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Last Attempt</p>
                <h3 className="text-2xl font-semibold mb-2">{recentExam.examTitle}</h3>
                <div className="flex gap-6 text-sm">
                  <span className="text-cyan-400 font-semibold">{recentExam.score.toFixed(1)} points</span>
                  <span className="text-slate-300">{recentExam.accuracy.toFixed(1)}% accuracy</span>
                </div>
              </div>
              <button
                onClick={() => onSelectExam(recentExam.examId)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-semibold flex items-center gap-2"
              >
                Resume <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Select Exam Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const exams = examRegistry.filter((e) => e.category === category);
              return (
                <button
                  key={category}
                  className="group relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 hover:bg-white/20 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">{getCategoryLabel(category)}</h3>
                    <p className="text-slate-300 text-sm mb-4">{exams.length} exams available</p>
                    <div className="space-y-2">
                      {exams.map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => onSelectExam(exam.id)}
                          className="w-full text-left px-3 py-2 text-sm rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors group/item"
                        >
                          <div className="flex items-center justify-between">
                            <span>{exam.year} - {exam.totalQuestions}Q</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
            <Clock className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="font-semibold mb-2">Smart Timer</h3>
            <p className="text-slate-400 text-sm">Circular progress timer with color-coded urgency</p>
          </div>
          <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
            <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-semibold mb-2">Instant Feedback</h3>
            <p className="text-slate-400 text-sm">Review answers with detailed explanations</p>
          </div>
          <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
            <ArrowRight className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="font-semibold mb-2">Auto-Save</h3>
            <p className="text-slate-400 text-sm">Never lose progress with continuous save</p>
          </div>
        </div>
      </div>
    </div>
  );
};
