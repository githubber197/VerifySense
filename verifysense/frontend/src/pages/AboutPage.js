import React, { useState, useEffect } from 'react';
import {
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  FireIcon, // Example of a new icon for "trending"
  ClockIcon, // Another new icon for "recent"
} from '@heroicons/react/24/outline';
import './AboutPage.css'; // Your CSS file for animations

function AboutPage() {
  const [liveScore, setLiveScore] = useState(85); // Placeholder for a live score
  const [recentClaims, setRecentClaims] = useState([
    'Climate change is a hoax.',
    'Eating bananas cures the common cold.',
    'The earth is flat.',
  ]);

  useEffect(() => {
    // Simulate a live update every few seconds
    const interval = setInterval(() => {
      setLiveScore(Math.floor(Math.random() * 20) + 80); // Update score between 80-100
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Column */}
      <div className="lg:col-span-2">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            About VerifySense
          </h1>
          <p className="text-lg text-gray-600">
            An AI-powered tool to detect misinformation and educate users
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-fade-in delay-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            VerifySense is designed to help users identify potential misinformation and develop critical thinking skills for evaluating online content. In today's digital landscape, misinformation spreads rapidly, making it essential to have tools that can quickly verify claims and provide educational context. Our goal is not just to tell you what's true or false, but to show you how we reached that conclusion and teach you the skills to evaluate information yourself.
          </p>
        </div>
        
        <hr className="my-6 border-gray-200" />
        
        <div className="animate-fade-in delay-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <DocumentTextIcon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Claim Extraction</h3>
              <p className="text-gray-700 text-sm">
                We use Google's Gemini AI and Natural Language API to identify and extract factual claims from your content.
              </p>
            </div>
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <MagnifyingGlassIcon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Fact Checking & Evidence</h3>
              <p className="text-gray-700 text-sm">
                We check claims against Google's Fact Check Tools API and gather evidence from reputable sources.
              </p>
            </div>
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <ShieldCheckIcon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Credibility Scoring</h3>
              <p className="text-gray-700 text-sm">
                Our algorithm evaluates multiple factors including fact check matches, source reliability, and consistency.
              </p>
            </div>
            <div className="feature-card">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                <AcademicCapIcon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Educational Explanation</h3>
              <p className="text-gray-700 text-sm">
                We provide a step-by-step explanation of our process, teaching you the skills to evaluate similar information yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel for Live Data */}
      <div className="hidden lg:block lg:col-span-1 p-4 bg-gray-50 rounded-xl animate-fade-in delay-300 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Live Credibility Score</h3>
          <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-inner">
            <div className="text-5xl font-extrabold text-blue-600 animate-pulse">
              {liveScore}%
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-gray-500" /> Recent Claims
          </h3>
          <ul className="space-y-3">
            {recentClaims.map((claim, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-700">{claim}</p>
                <span className="text-xs text-blue-500 mt-1 block">
                  Checking...
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <FireIcon className="h-5 w-5 mr-2 text-red-500" /> Trending Searches
          </h3>
          <ul className="space-y-3">
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold text-gray-800">
                AI and job displacement
              </p>
              <span className="text-xs text-gray-500 mt-1 block">
                Trending up
              </span>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold text-gray-800">
                Benefits of cold showers
              </p>
              <span className="text-xs text-gray-500 mt-1 block">
                Stable
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
