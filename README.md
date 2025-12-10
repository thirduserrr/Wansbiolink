# Biolink Template

A modern, animated biolink profile page with Discord presence integration, real-time view counter, and stunning visual effects.

## Features

- 🎨 **Beautiful Design** - Dark theme with light red accents and glassmorphism effects
- ✨ **Particle Effects** - Animated particles around the username
- 🔄 **Parallax Tilt :BUGGY: ** - Interactive card tilt effect on hover 
- 💬 **Discord Presence** - Live Discord status via Lanyard API **NEED TO JOIN LANYARD DISCORD"
- ⌨️ **Typewriter Bio** - Looping typewriter animation for bio text
- 🖱️ **Custom Cursor** - Glowing custom cursor effect
- 📱 **Fully Responsive** - Works on all devices

## Customization

### Profile Information

Edit `src/components/ProfileCard.tsx` to update:
- Profile name
- Bio texts (typewriter loop)
- Links array
- Avatar image

### Discord Integration

Update the Discord user ID in:
- `src/components/DiscordWidget.tsx`
- `src/components/DiscordPresence.tsx`
- `src/hooks/useLanyard.ts`

### Theme & Colors

Customize colors in `src/index.css`:
- Primary color (light red accent)
- Background gradients
- Glow effects

### Assets

Replace files in `/public`:
- `avatar.jpg` - Profile picture
- `logo.jpg` - Background image
- `favicon.ico` - Browser favicon

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (view counter backend)
- Lanyard API (Discord presence)

## Getting Started

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

For the view counter to work, you'll need Supabase credentials in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## License

MIT - Feel free to use and customize!
