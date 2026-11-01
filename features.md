# Ritish Singha — Portfolio Features & Roadmap Specification

This document details all implemented features, user interactions, and technical architectures in the portfolio.

---

## 1. Interactive Terminal (Developer Shell)
A fully functional, macOS-style glassmorphism terminal overlaid on the interface.
- **How to trigger:** Click the `>_` terminal icon in the navbar, or press ``Ctrl + ` ``.
- **Features:** 
  - **Auto-completion [Tab]:** Press `Tab` to automatically complete commands and parameters.
  - **Arrow key history:** Cycle previous inputs with `↑` and `↓`.
  - **Dynamic Theme Switcher:** `theme cyberpunk`, `theme tokyo`, or `theme emerald`.
  - **Pipeline Trigger:** `download cv` triggers the compiling animation and download directly from the CLI.
  - **System Status:** `status` displays degree progress (151/166 credits), ICPC achievements, and availability.
  - `neofetch` command displaying animated ASCII art and system stats.
  - `ls projects` command listing all GitHub repos in a Linux directory format.
  - `cat skills.txt` & `cat education` for viewing data like file contents.
  - `open github`, `open linkedin`, and `open codeforces` to instantly open profiles.
  - `history`, `date`, `whoami`, `contact`, `clear`, and `exit`.

---

## 2. Recruiter "Fast View" (1-Minute Pitch Mode)
A dedicated summary modal tailored specifically for recruiters and engineering hiring managers.
- **How to trigger:** Click the **"Recruiter Mode"** glowing pill button in the top navigation bar.
- **Features:**
  - **Live Availability Indicator:** Displays `🟢 OPEN FOR HIRE / INTERNSHIPS`.
  - **Instant Overview:** Degree stats (East Delta University, 151/166 credits completed), core stack, thesis details.
  - **Competitive Programming Summary:** 300+ Codeforces problems solved, ICPC Asia Regional participant.
  - **One-Click Actions:** Quick Preview CV, Download PDF, Email Ritish, or initiate a WhatsApp chat directly.

---

## 3. In-Browser Resume (PDF) Quick Preview Modal
Allows visitors and hiring managers to instantly inspect Ritish's CV without navigating away or downloading files.
- **How to trigger:** Click **"Preview CV"** in the Hero action buttons or from inside the Recruiter Mode modal.
- **Features:**
  - Embedded high-resolution PDF viewer with standard document tools.
  - Direct download action from within the modal bar.
  - Keyboard accessible (`Esc` to dismiss).

---

## 4. Project Detail Modals (Popups)
Instead of just sending users away to GitHub, clicking a project card keeps users engaged by opening a beautiful "Glassmorphism" popup model right on the site.
- **How to trigger:** Click anywhere on a featured project card.
- **Features:**
  - Displays project status badges (e.g., "Completed", "In Development").
  - Highlights specific role (e.g., Lead Developer, ML Engineer).
  - Outlines the real-world **Problem** and technical **Solution**.
  - Displays a clean checklist of **Key Features**.
  - Includes a direct link to the GitHub repository.

---

## 5. "Currently Coding to..." Spotify-Style Widget
A sleek, ambient music player widget showcasing personality and coding vibe.
- **Location:** Found at the bottom of the "About Me" section.
- **Features:**
  - An endlessly spinning vinyl record with an emerald center.
  - Cycles automatically through a playlist of tech-themed songs (Lofi, Synthwave, Ambient).
  - A live progress bar that tracks the exact time elapsed for each track.
  - Real-time `current : total` duration counter.

---

## 6. Subtle UI Sound Effects (Opt-in)
High-end, synthetic micro-sounds generated natively via the JavaScript Web Audio API (no external `.mp3` files required, ensuring zero impact on load times).
- **How to trigger:** Click the "Speaker" icon in the navbar to turn sounds ON.
- **Features:**
  - A rapid, soft `beep` when hovering over buttons and project cards.
  - A low, satisfying `boop` when actively clicking components.
  - A gentle notification `pop` when the RS AI Chatbot sends a message.

---

## 7. Animated "Download CV" Button
A dedicated, glowing "CV" button located in the Hero section.
- **Features:** When clicked, it triggers a sleek 1.8-second "Compiling Data..." animation, turning into a green checkmark before the real download triggers.

---

## 8. Interactive 3D Skill Sphere
A floating, rotating 3D globe of your technologies that acts as a visual centerpiece for your skills section.
- **Features:**
  - Uses the lightweight TagCloud.js library.
  - Allows users to drag and spin the sphere with their mouse.
  - Features your core stack: Python, Django, C++, Machine Learning, PostgreSQL, etc.

---

## 9. Enhanced Flashlight Cursor & Live Scroll Navigator
Deep immersion and UX tools that keep the website interactive.
- **Flashlight Cursor:** An emerald radial glow that follows the mouse pointer, illuminating the background in dark mode.
- **Scroll Navigator:** A floating sidebar on the right of the screen with quick-jump Up/Down arrow buttons and an SVG progress ring.

---

## 10. RS AI (Interactive Chatbot Assistant)
A customized interactive assistant helping visitors explore background, tech skills, and availability.
- **Features:**
  - Interactive quick-prompt chips (e.g., *"Core Tech Stack?"*, *"Open to hire?"*, *"Tell me about Ritish"*).
  - Dynamic responses with contact links and simulated thinking delay.

---

# Features and Improvements Plan (Roadmap)

The following development plan outlines prioritized upgrades and upcoming features to maintain peak technical relevance and recruiter conversion.

```
+-------------------------------------------------------------------------------+
|                       PORTFOLIO FEATURE ROADMAP                               |
+-------------------------------------------------------------------------------+
|  PHASE 1: RECRUITER & POLISH (COMPLETE)                                       |
|  [x] Recruiter Mode (1-Minute Pitch Modal)                                    |
|  [x] PDF CV Quick Preview Modal with in-browser frame                         |
|  [x] Terminal Autocomplete [Tab] & Theme/Status commands                     |
|  [x] Expanded RS AI Prompt Chips                                              |
+-------------------------------------------------------------------------------+
|  PHASE 2: LIVE APIS & EXTERNAL DATA                                           |
|  [ ] Live GitHub Profile & Repos Activity API Integration                    |
|  [ ] Codeforces Live Rating & Solved Counter Badge                            |
|  [ ] Spotify Now-Playing Real Live API Sync                                   |
+-------------------------------------------------------------------------------+
|  PHASE 3: CASE STUDIES & ARCHITECTURE DEEP-DIVES                              |
|  [ ] Tabbed Project Modals (Overview | Architecture | Challenges | Metrics)   |
|  [ ] Interactive System Flow Diagrams (Mermaid/SVG)                          |
|  [ ] Live Interactive Code / Model Playground (WGAN or ML Demo in-browser)   |
+-------------------------------------------------------------------------------+
|  PHASE 4: PERFORMANCE & ACCESSIBILITY (PWA)                                   |
|  [ ] PWA Manifest (manifest.json) & Service Worker for Offline Browsing      |
|  [ ] Mobile/Touch Battery Optimization (Auto-disable glow on touch devices)   |
|  [ ] Multilingual / i18n Support Toggle                                      |
+-------------------------------------------------------------------------------+
```

### Detailed Breakdown of Upcoming Phases

### Phase 2: Live APIs & External Data Integrations
1. **GitHub Activity & Live Commits API**:
   - Query `https://api.github.com/users/ritishsingha999/repos` to display real-time commit activity, recent repository pushes, and starred stats directly on the project cards.
2. **Codeforces Rating & Contest Tracker**:
   - Query `https://codeforces.com/api/user.info?handles=Ritish_Singha` to automatically fetch current rating, max rating, and total solved problems dynamically.
3. **Live Spotify Sync (Edge Function)**:
   - Provide real-time track display when actively coding via Spotify's Web API, falling back to the curated lofi playlist when offline.

### Phase 3: Case Studies & Architecture Deep-Dives
1. **Tabbed Project Detail Views**:
   - Expand the existing project modal into 4 tabs:
     - **Overview:** Problem, context, and end-user impact.
     - **Architecture:** Interactive SVG diagram showing client, Django REST API, database, and background tasks.
     - **Challenges & Trade-offs:** Database indexing choices, caching decisions, and query optimization.
     - **Metrics:** Throughput, latency improvements, and test coverage stats.
2. **Interactive Machine Learning Sandbox**:
   - Lightweight in-browser demo simulating the WGAN network traffic generation or customer retention classifier using ONNX Runtime Web.

### Phase 4: Performance, Mobile & Progressive Web App (PWA)
1. **Progressive Web App (PWA)**:
   - Add `manifest.json` and a lightweight service worker to allow users and recruiters to install the portfolio on mobile/desktop with instant offline access.
2. **Touch & Battery Optimization**:
   - Auto-detect coarse pointers (`@media (pointer: coarse)`) and reduce particle canvas recalculations to preserve battery life on smartphones.
3. **Multi-Language Support (i18n)**:
   - Add a quick language switcher for international recruiters.
