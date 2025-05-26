import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text mb-6 md:mb-0">
            FinAI
          </div>
          <div className="flex space-x-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} FinAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;