import React, { useState } from "react";
import { Download, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function generateHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ShiFt Experience Page</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #04081A; --surface: #0C1232; --surface2: #131B45; --border: #1C2555;
      --coral: #FF5252; --orange: #FF9F43; --teal: #2DD4A8; --green: #22C55E;
      --purple: #A78BFA; --red: #F54A48; --white: #FFFFFF; --off: #B8C0E0; --dim: #636D99;
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; background: #fff; }
    h1,h2,h3,h4,h5,h6 { font-family: 'Outfit', sans-serif; }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; color: inherit; }

    /* HERO */
    .hero {
      position: relative; min-height: 90vh; display: flex; align-items: center;
      justify-content: center; overflow: hidden;
      background: linear-gradient(165deg, #04081A 0%, #0C1232 60%, #04081A 100%);
    }
    .hero-pattern {
      position: absolute; inset: 0; opacity: 0.04;
      background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
      background-size: 48px 48px;
    }
    .hero-orb1 { position: absolute; top: 25%; left: -8rem; width: 24rem; height: 24rem; border-radius: 50%; opacity: 0.1; background: radial-gradient(circle, #A78BFA, transparent 70%); }
    .hero-orb2 { position: absolute; bottom: 25%; right: -8rem; width: 24rem; height: 24rem; border-radius: 50%; opacity: 0.1; background: radial-gradient(circle, #FF9F43, transparent 70%); }
    .hero-content { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; padding: 5rem 1.5rem; text-align: center; }
    .hero-logo { height: 80px; margin: 0 auto 3rem; }
    .hero-eyebrow { font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #FF9F43; margin-bottom: 1.5rem; }
    .hero-h1 { font-family: 'Outfit', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 1.5rem; }
    .hero-sub { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.125rem, 2.5vw, 1.5rem); font-weight: 500; color: #B8C0E0; max-width: 680px; margin: 0 auto 3rem; line-height: 1.6; }
    .hero-loss { color: #F54A48; }

    /* TESTIMONIALS / AI RECEPTIONIST */
    .section-light { padding: 4rem 1.5rem; background: #F2F4F8; }
    .section-dark { padding: 5rem 1.5rem; background: #0D0F33; }
    .section-white { padding: 5rem 1.5rem; background: #fff; }
    .section-gray { padding: 5rem 1.5rem; background: #F8F9FA; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-eyebrow { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F54A48; margin-bottom: 1rem; text-align: center; }
    .section-title { font-family: 'Outfit', sans-serif; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; text-align: center; margin-bottom: 1rem; }
    .section-subtitle { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; text-align: center; max-width: 600px; margin: 0 auto 3.5rem; color: #64748B; }

    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }

    /* Testimonial card */
    .testi-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 1.5rem; }
    .testi-img { width: 100%; height: 280px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; }
    .testi-title { text-align: center; font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 800; color: #A783BF; margin-top: 1rem; }

    /* LEAKS */
    .leaks-section { padding: 5rem 1.5rem; background: #0D0F33; }
    .leak-grid-top { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
    .leak-grid-bot { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
    .leak-card {
      background: #12143A; border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #F54A48;
      border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; min-height: 180px;
    }
    .leak-num { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #F54A48; letter-spacing: 1px; }
    .leak-name { font-family: 'Outfit', sans-serif; font-size: 1.125rem; font-weight: 700; color: #fff; line-height: 1.3; }
    .leak-quote { font-size: 0.875rem; font-style: italic; color: #64748B; flex: 1; }
    .leak-fix { font-size: 0.75rem; color: #fff; }
    .leak-fix-label { color: #22C55E; font-weight: 600; }
    .leak-demo-link { font-size: 0.75rem; font-weight: 600; color: #F54A48; background: none; border: none; cursor: pointer; padding: 0; text-align: left; margin-top: 0.25rem; }
    .leaks-summary { margin-top: 4rem; text-align: center; max-width: 680px; margin-left: auto; margin-right: auto; }
    .leaks-summary p { font-family: 'Plus Jakarta Sans', sans-serif; color: #64748B; margin-bottom: 0.75rem; }
    .leaks-summary h3 { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 2rem; }
    .btn-red {
      display: inline-block; font-family: 'Outfit', sans-serif; color: #fff; font-size: 1.0625rem; font-weight: 700;
      padding: 1rem 2.5rem; border-radius: 9999px; background: #F54A48;
      box-shadow: 0 4px 24px rgba(245,74,72,0.35); cursor: pointer; border: none;
      transition: transform 0.2s; text-decoration: none;
    }
    .btn-red:hover { transform: scale(1.03); }
    .leaks-summary-note { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.875rem; color: #64748B; margin-top: 1rem; }

    /* HOW IT WORKS */
    .step-card { background: #fff; border-radius: 16px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.05); text-align: center; }
    .step-badge { width: 2.5rem; height: 2.5rem; border-radius: 50%; background: #F54A48; color: #fff; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1.125rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
    .step-icon-wrap { width: 4rem; height: 4rem; border-radius: 12px; background: #F3E8FF; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
    .step-icon { width: 2rem; height: 2rem; color: #8B5CF6; }
    .step-title { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 600; color: #0D0F33; margin-bottom: 0.75rem; }
    .step-desc { font-size: 0.9375rem; color: #6B7280; line-height: 1.65; margin-bottom: 1.5rem; }
    .step-stat { border-top: 1px solid #F3F4F6; padding-top: 1.25rem; }
    .step-stat-num { font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 900; color: #2E7D32; }
    .step-stat-label { font-size: 0.875rem; color: #9CA3AF; margin-top: 0.25rem; }

    /* PROOF */
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 5rem; text-align: center; }
    .stat-num { font-family: 'Outfit', sans-serif; font-size: clamp(3rem, 6vw, 4rem); font-weight: 900; color: #fff; }
    .stat-unit { font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; color: #FA982F; }
    .stat-label { font-size: 1rem; color: rgba(255,255,255,0.6); margin-top: 0.5rem; }
    .case-card { border-radius: 16px; padding: 2rem; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); }
    .case-location { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.875rem; color: rgba(255,255,255,0.5); }
    .case-metric { font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 900; color: #F54A48; margin-bottom: 1.5rem; }
    .case-quote { border-left: 2px solid rgba(139,92,246,0.25); padding-left: 1.25rem; font-size: 1.0625rem; font-style: italic; color: rgba(255,255,255,0.8); line-height: 1.65; margin-bottom: 1.5rem; }
    .case-name { font-size: 0.875rem; color: rgba(255,255,255,0.9); font-weight: 500; }
    .case-company { font-size: 0.875rem; color: rgba(255,255,255,0.4); }

    /* TIMELINE */
    .timeline-bar { position: relative; height: 3rem; border-radius: 9999px; background: #0D0F33; overflow: hidden; margin: 1rem 0 0.75rem; }
    .timeline-calls-row { display: flex; justify-content: space-around; align-items: center; padding: 0 3rem; height: 100%; }
    .tl-dot { width: 0.875rem; height: 0.875rem; border-radius: 50%; }
    .tl-dot-after { background: #FA982F; }
    .tl-dot-biz { background: #8B5CF6; }
    .tl-mobile { display: none; }
    .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 700px; margin: 2rem auto 0; }
    .compare-card { border-radius: 12px; padding: 1.25rem; text-align: center; }
    .compare-bad { border: 1px solid #FECACA; background: rgba(254,226,226,0.5); }
    .compare-good { border: 1px solid #BBF7D0; background: rgba(240,253,244,0.5); }
    .compare-label-bad { font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 700; color: #EF4444; margin-bottom: 0.25rem; }
    .compare-label-good { font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 700; color: #2E7D32; margin-bottom: 0.25rem; }
    .compare-text { font-size: 0.75rem; color: #9CA3AF; }
    .supporting-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 800px; margin: 3rem auto 0; text-align: center; }
    .ss-num { font-family: 'Outfit', sans-serif; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 900; color: #0D0F33; }
    .ss-label { font-size: 0.8125rem; color: #9CA3AF; margin-top: 0.25rem; }

    /* FINAL CTA */
    .cta-section {
      position: relative; padding: 6rem 1.5rem; text-align: center; overflow: hidden;
      background: linear-gradient(165deg, #0D0F33 0%, #1A1D4A 60%, #0D0F33 100%);
    }
    .cta-orb { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 400px; border-radius: 50%; opacity: 0.1; background: radial-gradient(circle, #F54A48, transparent 70%); pointer-events: none; }
    .cta-pattern { position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px; }
    .cta-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
    .cta-pre { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; color: #fff; margin-bottom: 1rem; }
    .cta-h2 { font-family: 'Outfit', sans-serif; font-size: clamp(1.5rem, 3vw, 1.875rem); font-weight: 700; color: #fff; line-height: 1.4; margin-bottom: 1rem; }
    .cta-note { font-size: 0.875rem; color: #64748B; margin-bottom: 2.5rem; }
    .trust-line { font-size: 0.875rem; color: rgba(255,255,255,0.4); margin-top: 2rem; margin-bottom: 1.5rem; }
    .avatar-row { display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .avatar-stack { display: flex; }
    .avatar-stack img { width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid #0D0F33; margin-left: -0.625rem; object-fit: cover; }
    .avatar-stack img:first-child { margin-left: 0; }
    .stars { display: flex; gap: 2px; }
    .star { color: #FA982F; font-size: 0.875rem; }
    .rating-text { font-size: 0.875rem; color: rgba(255,255,255,0.7); }

    @media (max-width: 768px) {
      .tl-desktop { display: none; }
      .tl-mobile { display: block; }
      .supporting-stats { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
    }
  </style>
</head>
<body>

<!-- ====== HERO ====== -->
<section class="hero">
  <div class="hero-pattern"></div>
  <div class="hero-orb1"></div>
  <div class="hero-orb2"></div>
  <div class="hero-content">
    <img class="hero-logo" src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69891f74525fd7a798619082/774874628_FinalV2.png" alt="ShiFt Logo" />
    <p class="hero-eyebrow">See how ShiFt plugs the 7 revenue leaks</p>
    <h1 class="hero-h1">Your Business Has 7 Revenue Leaks</h1>
    <p class="hero-sub">They drain <span class="hero-loss">$30K–$100K</span> every month.<br />Most owners never find them.</p>
    <a href="#live-demo" style="display:inline-flex;align-items:center;gap:0.5rem;font-size:1rem;color:#B8C0E0;">
      See it in action ↓
    </a>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:8rem;background:linear-gradient(to top, rgba(255,255,255,0.05), transparent);"></div>
</section>

<!-- ====== AI RECEPTIONIST ====== -->
<section class="section-light">
  <div class="container">
    <h2 class="section-title" style="color:#0d0f33;">Advanced AI Receptionist<br />for Seamless Customer Communication</h2>
    <div class="grid-3" style="margin-top:3rem;">
      <article>
        <div class="testi-card">
          <img class="testi-img" src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80" alt="Investor and service provider" />
          <audio controls style="width:100%;"></audio>
        </div>
        <h3 class="testi-title">Investor and service provider</h3>
      </article>
      <article>
        <div class="testi-card">
          <img class="testi-img" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80" alt="Door Installation flow" />
          <audio controls style="width:100%;"></audio>
        </div>
        <h3 class="testi-title">Door Installation flow</h3>
      </article>
      <article>
        <div class="testi-card">
          <img class="testi-img" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80" alt="Exterior and Interior flow" />
          <audio controls style="width:100%;"></audio>
        </div>
        <h3 class="testi-title">Exterior and Interior flow</h3>
      </article>
    </div>
  </div>
</section>

<!-- ====== 7 REVENUE LEAKS ====== -->
<section class="leaks-section">
  <div class="container">
    <p class="section-eyebrow">WHY MOST CONTRACTORS LOSE $30K–$100K/MONTH</p>
    <h2 class="section-title" style="color:#fff;">The 7 Revenue Leaks Hiding in Your Business</h2>
    <p class="section-subtitle">Every service business has them. Most don't know they exist. Here's what they are — and how ShiFt plugs each one.</p>

    <div class="leak-grid-top">
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 1</p>
        <p class="leak-name">Slow Lead Response</p>
        <p class="leak-quote">"67% of prospects book with the competitor who responds first"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> AI answers every call in &lt; 30 seconds</p>
        <a class="leak-demo-link" href="#live-demo">See Demo ↓</a>
      </div>
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 2</p>
        <p class="leak-name">After-Hours Lead Loss</p>
        <p class="leak-quote">"35% of leads arrive when your office is closed — 90% are gone forever"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> 24/7 AI — your business never closes</p>
        <a class="leak-demo-link" href="#live-demo">See Demo ↓</a>
      </div>
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 3</p>
        <p class="leak-name">Booking Conversion Gap</p>
        <p class="leak-quote">"Leads you contact but never convert to booked appointments"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> AI booking + automated scheduling</p>
        <a class="leak-demo-link" href="#live-demo">See Demo ↓</a>
      </div>
    </div>

    <div class="leak-grid-bot">
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 4</p>
        <p class="leak-name">Appointment No-Shows</p>
        <p class="leak-quote">"40-50% of booked appointments never show up"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> Automated confirmations + reminders + rescheduling</p>
      </div>
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 5</p>
        <p class="leak-name">Low Close Rate</p>
        <p class="leak-quote">"Unqualified prospects waste your sales team's time"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> Pre-qualified, pre-sold appointments</p>
      </div>
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 6</p>
        <p class="leak-name">Follow-Up Failure</p>
        <p class="leak-quote">"Leads fall through pipeline cracks and never get re-engaged"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> AI follow-up recovers every dropped lead</p>
      </div>
      <div class="leak-card">
        <p class="leak-num">🩸 LEAK 7</p>
        <p class="leak-name">Marketing Waste</p>
        <p class="leak-quote">"No idea which marketing actually works — money disappears"</p>
        <p class="leak-fix"><span class="leak-fix-label">ShiFt Fix:</span> AI eliminates SDR overhead + tracks every dollar</p>
      </div>
    </div>

    <div class="leaks-summary">
      <p>The calculator showed you 2-3 of these leaks.</p>
      <h3>Your Reality Session reveals all 7 — with exact dollar amounts from YOUR business.</h3>
      <a class="btn-red" href="https://makea.shiftnow.io/widget/bookings/reality" target="_blank">Book Your Reality Session →</a>
      <p class="leaks-summary-note">15 minutes. Your numbers. Zero obligation.</p>
    </div>
  </div>
</section>

<!-- ====== LIVE DEMO ====== -->
<section id="live-demo" class="section-white">
  <div class="container">
    <p style="font-family:'Plus Jakarta Sans',sans-serif;font-size:1rem;font-style:italic;text-align:center;color:#636D99;margin-bottom:2.5rem;max-width:680px;margin-left:auto;margin-right:auto;">
      You just saw the leaks. Now experience the fix. Call our AI right now — see how fast it answers, how it qualifies, and how it books.
    </p>
    <div class="grid-2" style="align-items:center;">
      <div>
        <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(2rem,4vw,2.5rem);font-weight:700;color:#04081A;margin-bottom:1.5rem;line-height:1.2;">Experience ShiFt AI<br />Right Now</h2>
        <p style="font-size:1.0625rem;color:#B8C0E0;line-height:1.65;margin-bottom:2rem;">Don't take our word for it. Call our AI, listen to real calls, or watch it handle a live roofing inquiry. This is exactly what your customers will experience.</p>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:1rem;">
          <li style="display:flex;align-items:center;gap:0.75rem;font-size:1.0625rem;color:#04081A;">✅ Answers in under 30 seconds</li>
          <li style="display:flex;align-items:center;gap:0.75rem;font-size:1.0625rem;color:#04081A;">✅ Sounds natural, not robotic</li>
          <li style="display:flex;align-items:center;gap:0.75rem;font-size:1.0625rem;color:#04081A;">✅ Qualifies leads automatically</li>
          <li style="display:flex;align-items:center;gap:0.75rem;font-size:1.0625rem;color:#04081A;">✅ Books appointments to your calendar</li>
        </ul>
      </div>
      <div style="background:#0C1232;border:2px solid #1C2555;border-radius:16px;padding:2rem;">
        <div style="text-align:center;margin-bottom:2rem;">
          <div style="width:4rem;height:4rem;border-radius:50%;background:#2DD4A8;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.75rem;">📞</div>
          <h3 style="font-family:'Outfit',sans-serif;font-size:1.25rem;font-weight:700;color:#fff;margin-bottom:0.25rem;">Call Our AI Now</h3>
          <p style="font-size:0.875rem;color:#B8C0E0;margin-bottom:0.25rem;">Experience a live demo call</p>
          <p style="font-family:'Outfit',sans-serif;font-size:1.125rem;font-weight:700;color:#2DD4A8;">(855) 744-3824</p>
        </div>
        <a href="tel:+18557443824" class="btn-red" style="display:block;text-align:center;margin-bottom:2rem;">Start Demo Call →</a>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
          <div style="flex:1;height:1px;background:#1C2555;"></div>
          <span style="font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.1em;color:#636D99;">Or listen to real calls</span>
          <div style="flex:1;height:1px;background:#1C2555;"></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:#131B45;border:2px solid #1C2555;border-radius:12px;">
            <span style="color:#2DD4A8;font-size:1.25rem;">▶</span>
            <span style="color:#fff;font-size:0.875rem;flex:1;">Homeowner inquiry — Roof leak</span>
            <span style="color:#636D99;font-size:0.75rem;">1:23</span>
          </div>
          <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:#131B45;border:2px solid #1C2555;border-radius:12px;">
            <span style="color:#2DD4A8;font-size:1.25rem;">▶</span>
            <span style="color:#fff;font-size:0.875rem;flex:1;">After-hours emergency call</span>
            <span style="color:#636D99;font-size:0.75rem;">0:58</span>
          </div>
          <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:#131B45;border:2px solid #1C2555;border-radius:12px;">
            <span style="color:#2DD4A8;font-size:1.25rem;">▶</span>
            <span style="color:#fff;font-size:0.875rem;flex:1;">Appointment booking flow</span>
            <span style="color:#636D99;font-size:0.75rem;">1:45</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ====== HOW IT WORKS ====== -->
<section class="section-gray">
  <div class="container">
    <div style="text-align:center;margin-bottom:4rem;">
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(1.875rem,4vw,2.5rem);font-weight:700;color:#0D0F33;margin-bottom:1rem;">How ShiFt Works</h2>
      <p style="color:#6B7280;font-size:1.125rem;">Three steps. Zero missed opportunities.</p>
    </div>
    <div class="grid-3">
      <div class="step-card">
        <div class="step-badge">1</div>
        <div class="step-icon-wrap"><span style="font-size:2rem;">📞</span></div>
        <h3 class="step-title">Phone Rings</h3>
        <p class="step-desc">A homeowner needs a roofer. ShiFt AI answers in under 30 seconds — every time, 24/7/365.</p>
        <div class="step-stat"><p class="step-stat-num">27 sec</p><p class="step-stat-label">avg answer time</p></div>
      </div>
      <div class="step-card">
        <div class="step-badge">2</div>
        <div class="step-icon-wrap"><span style="font-size:2rem;">💬</span></div>
        <h3 class="step-title">AI Qualifies</h3>
        <p class="step-desc">Natural conversation identifies real buyers vs. tire-kickers. No scripts. No awkward pauses. Just smooth qualification.</p>
        <div class="step-stat"><p class="step-stat-num">78%</p><p class="step-stat-label">of jobs → first responder</p></div>
      </div>
      <div class="step-card">
        <div class="step-badge">3</div>
        <div class="step-icon-wrap"><span style="font-size:2rem;">📅</span></div>
        <h3 class="step-title">Appointment Booked</h3>
        <p class="step-desc">Qualified leads go straight to your calendar. You wake up to booked jobs — not voicemails.</p>
        <div class="step-stat"><p class="step-stat-num">3.2x</p><p class="step-stat-label">more appointments</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ====== PROOF ====== -->
<section class="section-dark">
  <div class="container">
    <div class="stats-row">
      <div><p class="stat-num">27<span class="stat-unit"> sec</span></p><p class="stat-label">Average answer time</p></div>
      <div><p class="stat-num">78<span class="stat-unit">%</span></p><p class="stat-label">Of jobs go to first responder</p></div>
      <div><p class="stat-num">24/7<span class="stat-unit">/365</span></p><p class="stat-label">Coverage with zero missed calls</p></div>
    </div>
    <div class="grid-2">
      <div class="case-card">
        <div class="case-location">📍 Phoenix, AZ</div>
        <div class="case-metric" style="display:flex;align-items:center;gap:1rem;"><span style="color:rgba(255,255,255,0.4);">22%</span> <span style="color:#FA982F;">→</span> <span>61%</span> <span style="font-size:0.875rem;color:rgba(255,255,255,0.5);margin-left:0.5rem;">Close Rate</span></div>
        <p class="case-quote">"I only talk to buyers now. ShiFt filters out the tire-kickers before they waste my time."</p>
        <p class="case-name">— Mike R., Owner</p>
        <p class="case-company">Desert Sun Roofing</p>
      </div>
      <div class="case-card">
        <div class="case-location">📍 Dallas, TX</div>
        <p class="case-metric">$67,000 <span style="font-size:0.875rem;color:rgba(255,255,255,0.5);">Recovered in 30 days</span></p>
        <p class="case-quote">"We were bleeding money after hours. First month with ShiFt, we booked 23 jobs that would have gone to voicemail."</p>
        <p class="case-name">— Sarah T., Operations Manager</p>
        <p class="case-company">Lone Star Roofing Co.</p>
      </div>
    </div>
  </div>
</section>

<!-- ====== TIMELINE ====== -->
<section class="section-white">
  <div class="container">
    <div style="text-align:center;margin-bottom:1.5rem;">
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(1.875rem,4vw,2.5rem);font-weight:700;color:#0D0F33;margin-bottom:1.25rem;">Never Miss Another Call</h2>
      <p style="color:#6B7280;font-size:1.0625rem;max-width:750px;margin:0 auto;font-style:italic;line-height:1.65;">
        "Last night at 11:47 PM, a homeowner in Phoenix needed a roofer. ShiFt answered in 23 seconds. They're getting measured tomorrow."
      </p>
    </div>
    <div class="tl-desktop" style="margin:4rem 0 4rem;">
      <div style="display:flex;justify-content:space-between;padding:0 2rem;margin-bottom:1rem;">
        <span style="font-size:0.75rem;color:#D1D5DB;text-transform:uppercase;letter-spacing:0.05em;">12 AM</span>
        <span style="font-size:0.75rem;color:#D1D5DB;text-transform:uppercase;letter-spacing:0.05em;">6 AM</span>
        <span style="font-size:0.75rem;color:#D1D5DB;text-transform:uppercase;letter-spacing:0.05em;">12 PM</span>
        <span style="font-size:0.75rem;color:#D1D5DB;text-transform:uppercase;letter-spacing:0.05em;">6 PM</span>
        <span style="font-size:0.75rem;color:#D1D5DB;text-transform:uppercase;letter-spacing:0.05em;">12 AM</span>
      </div>
      <div class="timeline-bar">
        <div style="position:absolute;left:0;top:0;bottom:0;width:25%;border-radius:9999px 0 0 9999px;background:rgba(250,152,47,0.08);"></div>
        <div style="position:absolute;right:0;top:0;bottom:0;width:25%;border-radius:0 9999px 9999px 0;background:rgba(250,152,47,0.08);"></div>
        <div class="timeline-calls-row">
          <div class="tl-dot tl-dot-after" title="2:14 AM - Emergency leak call - 19 sec"></div>
          <div class="tl-dot tl-dot-after" title="6:47 AM - Before-work inquiry - 24 sec"></div>
          <div class="tl-dot tl-dot-biz" title="11:30 AM - Lunch break call - 31 sec"></div>
          <div class="tl-dot tl-dot-biz" title="3:15 PM - Working hours - 22 sec"></div>
          <div class="tl-dot tl-dot-after" title="7:22 PM - After dinner call - 27 sec"></div>
          <div class="tl-dot tl-dot-after" title="10:58 PM - Late night emergency - 18 sec"></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-top:1rem;">
        <div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:0.625rem;height:0.625rem;border-radius:50%;background:#FA982F;"></div><span style="font-size:0.75rem;color:#9CA3AF;">After-hours</span></div>
        <div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:0.625rem;height:0.625rem;border-radius:50%;background:#8B5CF6;"></div><span style="font-size:0.75rem;color:#9CA3AF;">Business hours</span></div>
      </div>
    </div>
    <div class="compare-grid">
      <div class="compare-card compare-bad">
        <p style="font-size:1.25rem;margin-bottom:0.5rem;">📵</p>
        <p class="compare-label-bad">Your Phone</p>
        <p class="compare-text">4 of 6 go to voicemail</p>
      </div>
      <div class="compare-card compare-good">
        <p style="font-size:1.25rem;margin-bottom:0.5rem;">✅</p>
        <p class="compare-label-good">ShiFt AI</p>
        <p class="compare-text">6 of 6 answered instantly</p>
      </div>
    </div>
    <div class="supporting-stats">
      <div><p class="ss-num">847</p><p class="ss-label">After-hours calls answered</p></div>
      <div><p class="ss-num">312</p><p class="ss-label">Weekend calls answered</p></div>
      <div><p class="ss-num">$2.4M</p><p class="ss-label">Pipeline generated</p></div>
    </div>
  </div>
</section>

<!-- ====== FINAL CTA ====== -->
<section class="cta-section">
  <div class="cta-orb"></div>
  <div class="cta-pattern"></div>
  <div class="cta-inner">
    <p class="cta-pre">The calculator showed you the problem. This page showed you the fix.</p>
    <h2 class="cta-h2">Your Reality Session shows you the exact math — all 7 leaks quantified in dollars, with your numbers, live on screen.</h2>
    <p class="cta-note">15 minutes. Zero obligation.</p>
    <a class="btn-red" href="https://makea.shiftnow.io/widget/bookings/reality" target="_blank">Book My Reality Session →</a>
    <p class="trust-line">Join 200+ contractors who stopped missing buyers</p>
    <div class="avatar-row">
      <div class="avatar-stack">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" alt="" />
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces" alt="" />
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces" alt="" />
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces" alt="" />
        <img src="https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=64&h=64&fit=crop&crop=faces" alt="" />
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <div class="stars"><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span></div>
        <span class="rating-text">4.9 average</span>
      </div>
    </div>
  </div>
</section>

</body>
</html>`;
}

export default function Export() {
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      const html = generateHTML();
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shift-experience-page.html";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
      setLoading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(165deg, #04081A 0%, #0C1232 60%, #04081A 100%)" }}>
      <div className="max-w-lg w-full mx-auto px-6 text-center">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69891f74525fd7a798619082/774874628_FinalV2.png"
          alt="ShiFt Logo"
          className="h-14 mx-auto mb-10"
        />

        <h1 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-3">
          Export Page
        </h1>
        <p className="font-plus-jakarta text-base mb-10" style={{ color: "#B8C0E0" }}>
          Download the full ShiFt Experience Page as pure HTML — ready to import into Elementor or any HTML-compatible builder.
        </p>

        <div className="rounded-2xl p-6 mb-8 text-left" style={{ background: "#0C1232", border: "1px solid #1C2555" }}>
          <p className="font-outfit text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#FF9F43" }}>
            What's included
          </p>
          {[
            "Hero section with dynamic headline",
            "AI Receptionist testimonials section",
            "7 Revenue Leaks framework",
            "Live Demo section",
            "How It Works (3 steps)",
            "Proof / Case Studies",
            "Timeline section",
            "Final CTA with social proof",
            "All fonts, colors & styles inline",
            "Elementor-compatible structure",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#2DD4A8" }} />
              <span className="font-plus-jakarta text-sm text-white">{item}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleDownload}
          disabled={loading}
          className="w-full h-14 text-base font-outfit font-bold rounded-xl transition-all hover:scale-[1.02]"
          style={{
            background: downloaded ? "#22C55E" : "#F54A48",
            color: "white",
            boxShadow: "0 4px 24px rgba(245,74,72,0.35)",
          }}
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating…</>
          ) : downloaded ? (
            <><CheckCircle className="w-5 h-5 mr-2" /> Downloaded!</>
          ) : (
            <><Download className="w-5 h-5 mr-2" /> Download HTML File</>
          )}
        </Button>

        <p className="font-plus-jakarta text-xs mt-4" style={{ color: "#636D99" }}>
          Single .html file · All styles self-contained · No external dependencies
        </p>
      </div>
    </div>
  );
}