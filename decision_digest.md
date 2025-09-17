# Decision Digest

## Quick Reference
<!-- Compact summary of all active design decisions -->

### Active Decisions
- **Decision 1**: Brutalist design aesthetic with minimal styling and solid black circles for lived days. Why: User specifically requested this aesthetic for impactful visualization. Impact: Creates stark, functional interface that focuses on data.
- **Decision 2**: Frontend-only architecture using HTML/CSS/JS with localStorage. Why: Simplifies deployment and enables offline functionality. Impact: Faster development, easier deployment, works offline.
- **Decision 3**: 90-year lifespan grid (32,850 days) as standard visualization. Why: Provides comprehensive life perspective while maintaining performance. Impact: Standardized experience with efficient 52-column layout.

### Deprecated Decisions
- **Decision [#]**: [What]. Why: [reason]. Impact: [future effect]. - [Reason for deprecation]

## Current Architecture
- Single-page application with modular JavaScript classes
- localStorage for data persistence
- Real-time updates every minute
- Responsive grid layout (52 columns for years)

## Key Technologies
- HTML5 semantic structure
- CSS Grid for efficient circle layout
- Vanilla JavaScript (ES6+) with class-based architecture
- localStorage API for data persistence

## Design Principles
- Brutalist aesthetic: minimal, functional, bold
- High contrast: black background, white text and elements
- Monospace typography (Courier New)
- No animations or decorative elements
- Focus on data visualization over aesthetics

---
*Last Updated: December 19, 2024*
