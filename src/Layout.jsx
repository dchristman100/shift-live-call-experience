import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        :root {
          --bg: #04081A;
          --surface: #0C1232;
          --surface2: #131B45;
          --border: #1C2555;
          --coral: #FF5252;
          --orange: #FF9F43;
          --teal: #2DD4A8;
          --green: #22C55E;
          --purple: #A78BFA;
          --red: #FF4D4D;
          --white: #FFFFFF;
          --off: #B8C0E0;
          --dim: #636D99;
          --coral-glow: rgba(255,82,82,0.08);
          --orange-glow: rgba(255,159,67,0.08);
          --teal-glow: rgba(45,212,168,0.08);
          --green-glow: rgba(34,197,94,0.08);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Outfit', sans-serif;
        }

        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }

        .font-plus-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
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