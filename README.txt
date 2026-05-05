CHAMPIONS SUMMIT 2026 — WEBSITE README
======================================

Built: April 2026
Brand: Champions Summit 2026 — Powered by Level 52
Contact: Jayson Krause | jayson@level52.ca


FOLDER STRUCTURE
----------------
champions-summit-2026/
  index.html          Home page
  about.html          About the Event
  agenda.html         Agenda (Day 1 + Day 2)
  speakers.html       Speakers & Mentors
  register.html       Registration / Investment
  styles.css          Shared stylesheet (all pages)
  js/main.js          Accordion, nav toggle, smooth scroll, fade-in
  images/             (empty — placeholder images need to be added here)
  fonts/              (empty — using system fonts: Trebuchet MS + Helvetica/Arial)
  README.txt          This file


PLACEHOLDER IMAGES NEEDED
--------------------------
All pages currently use CSS background colors and inline SVG as placeholders.
Replace with actual photography and headshots:

1. HERO BACKGROUNDS (all pages)
   - Home hero: Calgary mountain range or skyline photography (full-width, ~1920x1080)
   - About hero: Event venue or Calgary professional photography
   - Agenda hero: Event/venue photography
   - Speakers hero: Speaker on stage or stage lighting photography
   - Register hero: Event/venue photography

2. SPEAKER & PANELIST PHOTOS
   - Keynote speakers: 3 headshots (square, min 400x400) — TBA
   - Featured panelists: 6 headshots (square, min 400x400) — TBA

3. FOUNDER HEADSHOTS (speakers.html)
   - Craig Senyk — headshot
   - Steve Mesler — headshot
   - Jayson Krause — headshot
   - Geri Greenall — headshot

4. CONTENT IMAGES
   - Leadership Gap section (about.html): Professional/executive photography
   - Presented By section (index.html): Microphone/stage photography background

5. SPONSOR LOGOS (register.html)
   - Presenting sponsor logos — TBA


CONTENT MARKED TBD / TODO
---------------------------
Search HTML files for <!-- TODO --> comments. Summary:

SPEAKERS (speakers.html + index.html):
  - All keynote speaker names, photos, roles, and bios (3 slots)
  - All featured panelist names, photos, roles, and bios (6 slots)
  - Speaker preview cards on home page (4 slots)

AGENDA (agenda.html):
  - CEO Fireside #1 — speaker name and details
  - CEO Fireside #2 — speaker name and details
  - CEO Fireside #3 — speaker name and details
  - CEO Fireside #4 — speaker name and details
  - Diary of a COO — panelist names
  - Diary of a CFO — panelist names

MENTOR CAFE (speakers.html):
  - Full 2026 mentor list (names, titles, organizations)

SPONSORS (register.html):
  - Sponsor logos and names (4 placeholder boxes)
  - Sponsor website links

REGISTRATION (register.html):
  - Form action endpoint / embed code (currently submits to #)
  - Payment processing integration

OTHER:
  - Social media links (footer on all pages)
  - Favicon image (currently using inline SVG placeholder)


SECTIONS NEEDING SPONSOR LOGOS
-------------------------------
  - register.html — "Presenting Sponsors" section at bottom
  - (Consider adding sponsor bar to footer across all pages once logos are available)


TECHNICAL NOTES
----------------
  - All internal links are relative (no absolute paths)
  - Site is responsive / mobile-first
  - Navigation includes mobile hamburger menu (handled by js/main.js)
  - Accordion on agenda page handled by js/main.js
  - System fonts: Trebuchet MS (headlines), Helvetica/Arial (body) — no external font load
  - No external JS frameworks — vanilla JavaScript only
  - Color palette (Level 52 Brand Guide 2025):
    #022F4A (navy dark), #26405D (navy mid), #465C75 (navy light),
    #D8722C (orange accent), #DE874B (orange mid), #E49C6B (orange light),
    #4D4F52 (dark grey), #2A2A2A (body text), #FFFFFF (white)
