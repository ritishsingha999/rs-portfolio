# Ritish Singha — Premium Portfolio Features

This document outlines all the high-end, premium features added to elevate the portfolio experience, making it stand out to recruiters and tech professionals.

---

## ✅ Implemented Features

### 1. Interactive Terminal (Easter Egg)
A fully functional, macOS-style glassmorphism terminal overlaid on the interface.
- **How to trigger:** Click the `>_` terminal icon in the navbar, or press `Ctrl + \``.
- **Features:** 
  - Arrow key command history (`↑` and `↓`).
  - `neofetch` command displaying animated ASCII art and system stats.
  - `ls projects` command listing all GitHub repos in a Linux directory format.
  - `cat skills.txt` & `cat education` for viewing data like file contents.
  - `open github` / `open linkedin` to instantly open your social profiles in new tabs.
  - `history`, `date`, `whoami`, `contact`, `clear`, and `exit`.

### 2. Project Detail Modals (Popups)
Instead of just sending users away to GitHub, clicking a project card keeps users engaged by opening a beautiful "Glassmorphism" popup model right on the site.
- **How to trigger:** Click anywhere on a featured project card.
- **Features:**
  - Displays project status badges (e.g., "Completed", "In Development").
  - Highlights your specific role (e.g., Lead Developer, ML Engineer).
  - Outlines the real-world **Problem** and your technical **Solution**.
  - Displays a clean checklist of **Key Features**.
  - Includes a direct link to the GitHub repository (hidden if the project is ongoing/private).

### 3. "Currently Coding to..." Spotify-Style Widget
A sleek, ambient music player widget showcasing your personality and coding vibe.
- **Location:** Found at the bottom of the "About Me" section.
- **Features:**
  - An endlessly spinning vinyl record with an emerald center.
  - Cycles automatically through a playlist of 6 tech-themed songs (Lofi, Synthwave, Ambient).
  - A live progress bar that tracks the exact time elapsed for each track.
  - Real-time `current : total` duration counter.

### 4. Subtle UI Sound Effects (Opt-in)
High-end, synthetic micro-sounds generated natively via the JavaScript Web Audio API (no external `.mp3` files required, ensuring zero impact on load times).
- **How to trigger:** Click the "Speaker" icon in the navbar to turn sounds ON.
- **Features:**
  - A rapid, soft `beep` when hovering over buttons and project cards.
  - A low, satisfying `boop` when actively clicking components.
  - A gentle notification `pop` when the RS AI Chatbot sends a message.

### 5. Animated "Download CV" Button
A dedicated, glowing "CV" button (located in the Hero section).
- **Features:** When clicked, it triggers a sleek 1.8-second "Compiling Data..." animation, turning into a green checkmark before the real download triggers! Adds a massive "wow" factor to your professional documents.

### 6. Interactive 3D Skill Sphere
A floating, rotating 3D globe of your technologies that acts as a visual centerpiece for your skills section.
- **Features:**
  - Uses the lightweight TagCloud.js library.
  - Allows users to drag and spin the sphere with their mouse.
  - Features your core stack: Python, Django, C++, Machine Learning, PostgreSQL, etc.

### 7. Enhanced Flashlight Cursor & Live Scroll Navigator
Deep immersion and UX tools that keep the website interactive.
- **Flashlight Cursor:** An emerald radial glow that follows the mouse pointer, illuminating the background in dark mode.
- **Scroll Navigator:** A floating sidebar on the right of the screen.
  - Features quick-jump Up/Down arrow buttons.
  - Shows a circular SVG progress ring that fills with neon green as you scroll further down the page.

### 8. RS AI (Live Chatbot)
A highly customized, interactive AI simulated experience.
- **Features:**
  - Fully interactive text input box for visitors to type any message.
  - Scans user messages for keywords (e.g., "hello", "skills", "projects", "contact") and replies dynamically.
  - Has a slight "thinking" delay for a realistic assistant experience.
