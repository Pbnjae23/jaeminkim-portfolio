# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Update database schema

## Code Style Guidelines

### Structure
- React functional components with TypeScript interfaces
- File naming: kebab-case (e.g., `component-name.tsx`)
- Component naming: PascalCase

### Imports
- React imports first
- Third-party libraries next
- Internal imports last using aliases (@/... or @shared/...)

### Styling
- Use Tailwind CSS classes
- Use `cn()` utility for conditional classes
- Follow class-variance-authority (cva) patterns for variants

### TypeScript
- Use strict TypeScript with explicit typing
- Prefer interfaces for component props
- Use React.forwardRef when passing refs

### State Management
- Use React hooks for local state
- Use React Query for API data fetching
- Custom hooks for reusable logic