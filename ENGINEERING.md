
```mermaid
flowchart TD
    subgraph Browser["Client Browser Engine"]
        DOM["DOM Tree (index.html)"]
        CSS["CSS Variable & Theme Engine (style.css)"]
        JS["Core Event & Module Loop (script.js)"]
    end

    subgraph Subsystems["JavaScript Subsystems"]
        P1["Particle Net (HTML5 Canvas 2D)"]
        P2["Custom Cursor & Glow Tracking"]
        P3["Interactive Terminal Engine (REPL)"]
        P4["Web Audio API Sound Engine"]
        P5["Modal Manager (Recruiter / Resume / Projects)"]
        P6["Music Player Loop & Lofi Cycle"]
        P7["RS AI Simulated Assistant"]
    end

    subgraph Assets["Static Assets & External CDNs"]
        PDF["RS_CV.pdf (In-browser Embed)"]
        LUCIDE["Lucide Icons CDN"]
        TAG["TagCloud.js (3D Sphere)"]
        FONTS["Google Fonts (Outfit, Inter, JetBrains Mono)"]
    end

    DOM --> JS
    CSS --> DOM
    JS --> Subsystems
    Subsystems --> Assets
```

---

## 2. Engineering Working Process & Lifecycle

### Stage 1: Document Initialization & Bootstrap Flow
```mermaid
sequenceDiagram
    autonumber
    actor User as Visitor / Recruiter
    participant DOM as Browser DOM
    participant Preloader as Preloader Subsystem
    participant JS as script.js
    participant Audio as Web Audio Context

    User->>DOM: Load URL (index.html)
    DOM->>Preloader: Display INIT Pulse Animation
    DOM->>JS: DOMContentLoaded Event Fires
    JS->>JS: safeCreateIcons() via Lucide CDN
    JS->>JS: Initialize 14 modular subsystems
    par Background tasks
        JS->>DOM: Start Particle Canvas animation loop (requestAnimationFrame)
        JS->>DOM: Setup Mouse & Glow Listeners
    end
    JS->>Preloader: dismissPreloader() after 2.5s / window.onload
    Preloader-->>User: Fade-out transition reveals Hero section
```

1. **Defensive Preloader Safety**:
   - The preloader uses a **triple-redundancy dismissal pattern**:
     1. Automatic delay after `DOMContentLoaded` (2500ms for brand aesthetic).
     2. `window.addEventListener('load')` when all remote fonts and styles resolve.
     3. An absolute hard fallback timeout at `6000ms` so a visitor is never locked out on slow networks.
2. **Safe Icon Injection**:
   - `safeCreateIcons()` verifies `window.lucide` is available before calling `.createIcons()`, preventing unhandled exceptions from halting execution.

---

## 3. Subsystem Engineering Breakdown

### A. The Interactive Terminal Subsystem (`initTerminal()`)
The terminal simulates an interactive Unix-style pseudo-terminal using a customized REPL (Read-Eval-Print-Loop):
- **Command Capture & History**:
  - Listens to `keydown` on `#terminal-input`.
  - Captures `ArrowUp` and `ArrowDown` to traverse an in-memory `commandHistory` array with pointer `historyIndex`.
- **Autocomplete Engine (`Tab`)**:
  - Intercepts default browser tab-focus behavior with `e.preventDefault()`.
  - Prefix-matches input against registered commands (`availableCommands.find(c => c.startsWith(...))`).
- **Command Dispatcher**:
  - Sanitizes user input (`.toLowerCase().trim().split(/\s+/)`).
  - Routes to command handlers: `whoami`, `status`, `neofetch`, `theme`, `download`, `ls`, `cat`.
  - Manipulates the DOM dynamically and auto-scrolls using `terminalBody.scrollTop = terminalBody.scrollHeight`.

### B. Synthesized Web Audio Engine (`initSoundEffects()`)
Rather than downloading heavy `.mp3` audio files which slow down page load:
- **Pure Native Web Audio API**:
  - Instantiates an `AudioContext` only after the first user gesture to comply with modern browser autoplay policies.
  - Generates tones mathematically via `OscillatorNode` (e.g., frequency `800Hz`, waveforms `sine` or `triangle`).
  - Shapes audio envelopes using `GainNode` with `exponentialRampToValueAtTime()` for crisp, click-free decay.
- **Opt-in Privacy & UX**:
  - Sound starts muted by default.
  - Toggled through the navbar speaker icon, saving user preference across interactions.

### C. The 60 FPS Particle Canvas System (`initParticles()`)
- **Canvas Math & Spatial Connections**:
  - Allocates an array of `Particle` objects with individualized `(x, y)` positions, sizes, and vector velocities `(speedX, speedY)`.
  - Runs inside a continuous `requestAnimationFrame(animate)` loop.
  - Computes Euclidean distance $d = \sqrt{\Delta x^2 + \Delta y^2}$ between every particle and the cursor.
  - If $d < \text{mouse.radius}$, an elastic repulsion force directs particles away from the cursor.
  - If distance between two neighboring particles is $< 100\text{px}$, draws a semi-transparent connecting line with opacity proportional to proximity.

### D. Modal & Dialog State Management
- Includes three discrete modal types:
  1. **Project Detail Modal**: Hydrates content dynamically from `data-*` attributes (`data-title`, `data-problem`, `data-solution`, `data-features`, `data-github`) on the clicked card.
  2. **Recruiter Mode Modal**: Provides a condensed 1-minute summary, locking page scroll (`document.body.style.overflow = 'hidden'`) while active.
  3. **Resume Preview Modal**: Embeds [RS_CV.pdf](file:///f:/Portfolio/RS_CV.pdf) into an internal sandbox `<iframe>` with hardware-accelerated rendering.
- **Global Event Isolation**:
  - Clicking outside the modal container on the overlay backdrop triggers dismissal.
  - Centralized `Escape` key listener closes whichever overlay is currently top-level.

### E. Dynamic Theme Management (CSS Variable Injection)
- Themes are driven by CSS Custom Properties (`--accent-primary`, `--accent-secondary`, `--accent-glow`).
- Switching themes (`theme cyberpunk`, `theme tokyo`, or Light/Dark toggle) mutates CSS variables directly on `document.documentElement.style` or applies class `.light-mode` on `document.body`.
- Repaints occur seamlessly without page reloading or layout recalculations.

---

## 4. Development & Deployment Pipeline

```mermaid
flowchart LR
    Dev["Local Dev / Testing (python -m http.server 3000)"] --> Lint["Syntax & Linting (node -c script.js)"]
    Lint --> Git["Git Version Control (main)"]
    Git --> Vercel["Vercel Edge CDN Deployment"]
    Vercel --> Prod["Live Global Production"]
```

1. **Development & Local Verification**:
   - Run zero-dependency static server (`python -m http.server 3000` or `npx serve .`).
   - Validate JavaScript syntax using `node -c script.js`.
2. **Git Workflow**:
   - Changes committed to branch / `main`.
   - `.gitignore` prevents tracking local deployment builds and cache files (`.vercel`, system logs).
3. **Continuous Deployment (Vercel)**:
   - Configured via [.vercel](file:///f:/Portfolio/.vercel). Every push to `main` triggers a direct atomic deploy to the Vercel edge network, served over HTTP/2 with automatic TLS/SSL and Brotli compression.

