# Technical Stack & Conventions

## Core Technologies
- **HTML5**: Semantic structure for the life calendar interface
- **CSS3**: Grid layout, animations, responsive design
- **Vanilla JavaScript (ES6+)**: Real-time calculations, DOM manipulation, localStorage
- **CSS Grid/Flexbox**: For efficient circle grid layout
- **Local Storage API**: Data persistence for user profiles and journal entries

## Development Tools
- **Browser DevTools**: Debugging and performance monitoring
- **Local Development Server**: For testing (Live Server extension or similar)

## Build & Deployment
- **Static Hosting**: GitHub Pages, Netlify, or Vercel
- **No Build Process**: Direct HTML/CSS/JS files
- **CDN**: Optional for external libraries if needed

## Code Conventions
- **ES6+ Features**: Arrow functions, const/let, template literals
- **CSS**: BEM methodology for class naming
- **JavaScript**: Modular approach with separate files for different features
- **Responsive Design**: Mobile-first approach

## Project Structure
```
/
├── index.html          # Main application page
├── css/
│   ├── styles.css      # Main stylesheet
│   └── grid.css        # Grid-specific styles
├── js/
│   ├── app.js          # Main application logic
│   ├── calendar.js     # Life calendar calculations
│   ├── journal.js      # Journaling functionality
│   └── storage.js      # Local storage management
└── assets/
    └── icons/          # Any icons or images
```

## Dependencies
- **None**: Pure vanilla web technologies
- **Optional**: Font libraries (Google Fonts) for typography

## Environment Setup
- **Modern Browser**: Chrome, Firefox, Safari, Edge (ES6+ support)
- **Local Server**: For development (optional but recommended)
- **No Node.js Required**: Pure frontend project

---
*Last Updated: December 19, 2024*
