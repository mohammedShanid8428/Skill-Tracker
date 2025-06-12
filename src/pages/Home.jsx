import React from 'react';
import { BookOpen, TrendingUp, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* Welcome */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-10 mb-16">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600 animate-bounce" />
              <h1 className="text-4xl font-bold text-blue-800">Welcome to SkillTracker</h1>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              Your personal dashboard to track skills, projects, certifications, and career growth.
            </p>
            <div className="bg-white border-l-4 border-blue-600 p-4 rounded-lg shadow">
              <p className="text-blue-800 italic">
                "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://thumbs.dreamstime.com/b/seeking-feedback-learning-regularly-improves-professional-skills-seeking-feedback-ongoing-learning-improve-skills-381576267.jpg"
              alt="Skill development"
              className="w-full h-80 object-cover"
            />
          </div>
        </section>

        {/* Motivation Quotes */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Why Skill Tracking Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Skills are the currency of the future. Track them wisely.",
                author: "Professional Development Coach",
              },
              {
                quote: "What gets measured gets improved. Start tracking today.",
                author: "Productivity Expert",
              },
              {
                quote: "Your skillset is your signature. Make it remarkable.",
                author: "Career Advisor",
              },
            ].map((q, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border-l-4 border-blue-500"
              >
                <Quote className="h-6 w-6 text-blue-500 mb-3" />
                <p className="text-gray-700 italic mb-2">{`"${q.quote}"`}</p>
                <p className="text-sm text-gray-500 text-right">— {q.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
