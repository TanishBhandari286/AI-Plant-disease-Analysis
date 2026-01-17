# AgroVision Frontend

Modern React-based frontend for the AgroVision crop disease detection platform.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **Lucide React** - Icon library

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
src/
├── App.jsx           # Main application component
├── App.css           # Component styles
├── index.css         # Global styles and design system
├── main.jsx          # Application entry point
├── farmingContent.js # Farming tips and content data
├── renderFunctions.js # Utility render functions
└── assets/           # Static assets
```
