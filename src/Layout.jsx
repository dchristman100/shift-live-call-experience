import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        :root {
          --navy-core: #0D0F33;
          --coral-action: #F54A48;
          --orange-energy: #FA982F;
          --purple-accent: #8B5CF6;
          --success-green: #2E7D32;
          --light-gray: #F8F9FA;
          --medium-gray: #6C757D;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 74, 72, 0.4); }
          50% { box-shadow: 0 0 20px 8px rgba(245, 74, 72, 0.15); }
        }
        
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        
        .animate-bounce-down {
          animation: bounce-down 1.5s ease-in-out infinite;
        }
        
        .animate-dot-pulse {
          animation: dot-pulse 2s ease-in-out infinite;
        }
      `}</style>
      {children}
    </div>
  );
}