'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";


const features = [
  {
    title: "AI-Powered Insights",
    description:
      "Get personalized financial advice using advanced AI algorithms tailored to your needs.",
    icon: "sparkles", // Heroicon name
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Real-Time Tracking",
    description:
      "Monitor your income and expenses in real-time with a sleek, intuitive dashboard.",
    icon: "chart-bar",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Secure & Private",
    description:
      "Your data is encrypted and secure, ensuring full privacy and peace of mind.",
    icon: "shield-check",
    gradient: "from-green-500 to-emerald-600",
  },
];

// Modern Icon components using SVG
const Icons = {
  sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 2a1 1 0 01.707 1.707l-.707.707.707.707A1 1 0 1115 6l-.707-.707-.707.707A1 1 0 1113 5l.707-.707L13 3.586A1 1 0 112 3zm1 10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 12a1 1 0 01.707 1.707l-.707.707.707.707A1 1 0 1115 16l-.707-.707-.707.707A1 1 0 1113 15l.707-.707-.707-.707A1 1 0 1113 13z" clipRule="evenodd" />
    </svg>
  ),
  "chart-bar": () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  ),
  "shield-check": () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
};

// Animated number counter component
const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        setCount(Math.floor((progress / duration) * end));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count}+</span>;
};

// Background decoration component
const BackgroundDecoration = () => (
  <div className="absolute inset-0 overflow-hidden -z-10 opacity-20">
    <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
    <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
  </div>
);

export default function FinanceLanding() {
  const { isSignedIn, user } = useUser();
  
  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundDecoration />
      
      {/* Header/Navbar */}
      <nav className="relative z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">FinAI</div>
          <ul className="hidden md:flex space-x-8">
             <li>
              <a href="#Features" className="hover:text-cyan-300 transition-colors cursor-pointer">
                Features
              </a>
            </li>
            
            <li className="hover:text-cyan-300 transition-colors cursor-pointer">About</li>
          </ul>
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-300">Welcome, {user.firstName || user.username}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/sign-in">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/20 transition duration-300">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 text-transparent bg-clip-text">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Manage Your Money with AI-Driven Insights
            </h1>
          </div>
          <p className="mt-8 text-slate-300 text-xl max-w-2xl mx-auto">
            Make smarter financial decisions effortlessly with personalized advice,
            real-time tracking, and enterprise-grade security.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isSignedIn ? (
              <Link href="/dashboard">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition duration-300 w-full sm:w-auto">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition duration-300 w-full sm:w-auto">
                  Start Trial
                </button>
              </Link>
            )}
            <button className="border border-slate-700 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm font-semibold py-4 px-8 rounded-full transition duration-300 w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
        </div>
        
        {/* Abstract dashboard visualization */}
        <div className="relative mt-20 w-full max-w-5xl mx-auto">
          <div className="aspect-video rounded-xl p-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500">
            <div className="h-full w-full rounded-lg bg-slate-800 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-2">
                  <div className="h-6 w-40 bg-slate-700 rounded-md"></div>
                  <div className="h-4 w-24 bg-slate-700 rounded-md"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-10 w-10 rounded-md bg-blue-600"></div>
                  <div className="h-10 w-10 rounded-md bg-cyan-600"></div>
                  <div className="h-10 w-10 rounded-md bg-teal-600"></div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-slate-900/60 rounded-lg p-4">
                  <div className="h-4 w-32 bg-slate-700 rounded-md mb-4"></div>
                  <div className="h-40 flex items-end justify-between px-2">
                    <div className="w-8 bg-blue-500 rounded-t-md h-1/3"></div>
                    <div className="w-8 bg-blue-500 rounded-t-md h-1/4"></div>
                    <div className="w-8 bg-blue-500 rounded-t-md h-2/3"></div>
                    <div className="w-8 bg-blue-500 rounded-t-md h-1/2"></div>
                    <div className="w-8 bg-blue-500 rounded-t-md h-full"></div>
                    <div className="w-8 bg-blue-500 rounded-t-md h-3/4"></div>
                    <div className="w-8 bg-blue-500 rounded-t-md h-2/5"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-900/60 rounded-lg p-4 h-1/2">
                    <div className="h-4 w-20 bg-slate-700 rounded-md mb-4"></div>
                    <div className="flex justify-center items-center h-24">
                      <div className="h-20 w-20 rounded-full border-4 border-cyan-500 flex items-center justify-center text-2xl font-bold">
                        75%
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-4 h-1/2">
                    <div className="h-4 w-24 bg-slate-700 rounded-md mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                      </div>
                      <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      </div>
                      <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-teal-500 to-green-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-full text-white font-medium shadow-lg shadow-blue-700/30">
            Interactive Demo
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 border-y border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text mb-2">
                <Counter end={200} />
              </div>
              <p className="text-slate-400">Financial tasks automated</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text mb-2">
                <Counter end={50} />
              </div>
              <p className="text-slate-400">Hours saved monthly</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-green-300 text-transparent bg-clip-text mb-2">
                <Counter end={35} />
              </div>
              <p className="text-slate-400">Increase in savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 text-transparent bg-clip-text mb-6">
            Your Smart Finance Advisor
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            This application helps you manage your money easily and smartly using
            artificial intelligence. It provides personalized advice based on your
            actual financial data to help you make the right financial decisions.
            Our design is modern and simple to offer a smooth user experience, with
            an interactive interface that adapts to all devices.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, description, icon, gradient }) => (
            <div
              key={title}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${gradient} p-4 rounded-lg inline-block text-white mb-6 group-hover:shadow-lg group-hover:shadow-${gradient.split('-')[1]}/30 transition-shadow duration-300`}>
                {Icons[icon]()}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                {title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-cyan-800 rounded-2xl p-12 shadow-2xl shadow-blue-800/20">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-cyan-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Managing Your Finances Today
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of users who have transformed their financial future with our AI-powered platform.
            </p>
            {isSignedIn ? (
              <Link href="/dashboard">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition duration-300">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition duration-300">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      
    </main>
  );
}