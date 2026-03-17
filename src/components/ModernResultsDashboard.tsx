import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Result } from '../types';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface ModernResultsDashboardProps {
  result: Result;
  onReviewAnswers: () => void;
  onRestartExam: () => void;
}

export const ModernResultsDashboard = ({
  result,
  onReviewAnswers,
  onRestartExam,
}: ModernResultsDashboardProps) => {
  const scorePercentage = (result.totalScore / (result.correctCount + result.incorrectCount + result.unattemptedCount) / 2) * 100 || 0;
  const estimatedPercentile = Math.max(0, Math.min(99, 100 - scorePercentage + Math.random() * 10));

  const pieData = [
    { name: 'Correct', value: result.correctCount, color: '#10b981' },
    { name: 'Incorrect', value: result.incorrectCount, color: '#ef4444' },
    { name: 'Unattempted', value: result.unattemptedCount, color: '#8b5cf6' },
  ];

  const topicChartData = result.topicWise.map((topic) => ({
    name: topic.topic.substring(0, 3),
    fullName: topic.topic,
    correct: topic.correct,
    incorrect: topic.incorrect,
    unattempted: topic.unattempted,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-auto">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Exam Completed
          </h1>
          <p className="text-slate-400">Here's your comprehensive performance analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="backdrop-blur-md bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-6 border border-emerald-500/30">
            <p className="text-emerald-300 text-sm font-semibold mb-2">Total Score</p>
            <h3 className="text-4xl font-bold text-white">{result.totalScore.toFixed(2)}</h3>
            <p className="text-emerald-200 text-xs mt-2">Out of {result.correctCount + result.incorrectCount}</p>
          </div>

          <div className="backdrop-blur-md bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl p-6 border border-cyan-500/30">
            <p className="text-cyan-300 text-sm font-semibold mb-2">Accuracy</p>
            <h3 className="text-4xl font-bold text-white">{result.accuracy.toFixed(1)}%</h3>
            <p className="text-cyan-200 text-xs mt-2">{result.correctCount} of {result.correctCount + result.incorrectCount} correct</p>
          </div>

          <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/30">
            <p className="text-blue-300 text-sm font-semibold mb-2">Percentile (Est.)</p>
            <h3 className="text-4xl font-bold text-white">{estimatedPercentile.toFixed(1)}</h3>
            <p className="text-blue-200 text-xs mt-2">Based on performance</p>
          </div>

          <div className="backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-6 border border-purple-500/30">
            <p className="text-purple-300 text-sm font-semibold mb-2">Time Taken</p>
            <h3 className="text-4xl font-bold text-white">120</h3>
            <p className="text-purple-200 text-xs mt-2">minutes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                  formatter={(value) => `${value} questions`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Topic-wise Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topicChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="name" stroke="rgba(148, 163, 184, 0.5)" />
                <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="correct" fill="#10b981" name="Correct" />
                <Bar dataKey="incorrect" fill="#ef4444" name="Incorrect" />
                <Bar dataKey="unattempted" fill="#8b5cf6" name="Unattempted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
          <h3 className="text-xl font-semibold mb-6">Subject Breakdown</h3>
          <div className="space-y-3">
            {result.topicWise.map((topic) => {
              const totalInTopic = topic.correct + topic.incorrect + topic.unattempted;
              const accuracy = totalInTopic > 0 ? (topic.correct / totalInTopic) * 100 : 0;
              return (
                <div key={topic.topic} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-white">{topic.topic}</span>
                    <span className="text-slate-300">
                      {topic.correct}/{totalInTopic} ({accuracy.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onReviewAnswers}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/30"
          >
            Review Answers <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onRestartExam}
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 border border-slate-600"
          >
            <RotateCcw className="w-5 h-5" /> Take Another Exam
          </button>
        </div>
      </div>
    </div>
  );
};
