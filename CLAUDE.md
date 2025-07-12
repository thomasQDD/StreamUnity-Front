# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 IMPORTANT GIT COMMIT POLICY 🚨

**NEVER mention Claude, Claude Code, AI assistance, or any AI-related references in Git commits, commit messages, or code comments. All commits must appear as normal human development work without any AI attribution or mentions.**

## Project Status

**✅ READY**: This project is now **fully configured and executable**. Both the frontend and backend applications can be built, run, and deployed successfully.

## Available Commands

### Frontend (StreamUnity-Front)
- `npm install` - Install all dependencies
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Backend (StreamUnity-API)
- `npm install` - Install all dependencies
- `npm run start:dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `docker-compose up -d` - Start PostgreSQL database

#### Prisma Database Commands
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database (dev only)
- `npm run prisma:migrate` - Create and run new migration
- `npm run prisma:deploy` - Deploy migrations in production
- `npm run prisma:studio` - Open database management GUI

## Build Infrastructure

The following configuration files are properly set up:
- ✅ `package.json` - Complete dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration with path aliases
- ✅ `next.config.ts` - Next.js configuration
- ✅ `tailwind.config.js` - Tailwind CSS configuration
- ✅ `postcss.config.mjs` - PostCSS configuration
- ✅ `components.json` - shadcn/ui configuration
- ✅ `eslint.config.mjs` - ESLint configuration

## Project Architecture

StreamUnity is a full-stack TypeScript application for managing multi-platform streaming chat:

### Core Structure
```
StreamUnity/
├── StreamUnity-Front/          # Next.js 15 TypeScript Frontend
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── page.tsx        # Home page (/)
│   │   │   ├── auth/
│   │   │   │   └── page.tsx    # Authentication page (/auth)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx    # Dashboard page (/dashboard)
│   │   │   └── globals.css     # Global styles with Tailwind CSS
│   │   ├── components/
│   │   │   ├── layout/         # Reusable layout components
│   │   │   │   ├── Header.tsx  # Header with variants (home, auth, dashboard)
│   │   │   │   └── Footer.tsx  # Footer component
│   │   │   ├── pages/          # Page components
│   │   │   │   ├── SimpleHome.tsx   # Functional landing page
│   │   │   │   ├── AuthPage.tsx     # Authentication page
│   │   │   │   └── DashboardPage.tsx # Dashboard page
│   │   │   ├── features/       # Feature-specific components
│   │   │   │   ├── PlatformIcon.tsx    # Platform icon component
│   │   │   │   └── PlatformBadge.tsx   # Platform badge component
│   │   │   └── ui/             # shadcn/ui component library (15+ components)
│   │   ├── lib/
│   │   │   └── utils.ts        # Utilities (cn, platform configs)
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript type definitions
│   │   ├── hooks/              # Custom hooks (auth, localStorage - SSR compatible)
│   │   └── services/           # API integration services
│   ├── public/                 # Static assets
│   └── Configuration files     # Next.js, build, lint, and style configs
│
├── StreamUnity-API/            # NestJS TypeScript Backend
│   ├── src/
│   │   ├── main.ts             # NestJS application entry point
│   │   ├── app.module.ts       # Main application module
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.module.ts  # Auth module configuration
│   │   │   ├── auth.service.ts # Auth business logic
│   │   │   └── auth.controller.ts # Auth API endpoints
│   │   ├── chat/               # Chat module
│   │   │   ├── chat.module.ts  # Chat module configuration
│   │   │   ├── chat.service.ts # Chat business logic
│   │   │   └── chat.gateway.ts # WebSocket gateway
│   │   └── prisma/             # Database module
│   │       ├── prisma.module.ts # Prisma module configuration
│   │       └── prisma.service.ts # Prisma client service
│   ├── prisma/
│   │   └── schema.prisma       # Database schema definition
│   ├── docker-compose.yml      # PostgreSQL database setup
│   └── Configuration files     # Build, lint, and environment configs
│
└── CLAUDE.md                   # This documentation file
```

### Key Features
- **Multi-platform chat aggregation** (Twitch, YouTube, TikTok, Facebook Gaming, Kick)
- **Authentication system** with login/signup/forgot password flows
- **Dashboard** with 4 main sections:
  - Overview: Platform statistics and connection status
  - Profile: User settings and platform connections
  - Chat Settings: Overlay customization and moderation settings
  - Chat Moderation: Real-time unified chat with moderation tools

### Technology Stack

#### Frontend (StreamUnity-Front)
- **Framework**: Next.js 15 with App Router and TypeScript
- **Rendering**: Server-Side Rendering (SSR) and Static Site Generation (SSG)
- **Routing**: File-based routing with App Router
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (15+ components)
- **Icons**: Lucide React
- **Utilities**: clsx + tailwind-merge for className management
- **Linting**: ESLint with Next.js and TypeScript rules

#### Backend (StreamUnity-API)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with bcrypt
- **Real-time**: Socket.IO for WebSocket connections
- **Validation**: class-validator and class-transformer
- **Configuration**: @nestjs/config for environment management

### Component Architecture
- **Multi-Page Application**: Uses Next.js App Router for file-based routing
- **Component Pattern**: Functional components with TypeScript interfaces and 'use client' directives
- **State Management**: Local state with React hooks (SSR compatible)
- **Styling**: Tailwind utility classes with dark theme support
- **Path Aliases**: `@/` alias for `src/` directory
- **Modular Design**: Separated app routes, layout, pages, features, and UI components
- **SSR Compatibility**: All components designed to work with server-side rendering

## Development Notes

### Getting Started
1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Build for production**: `npm run build`
4. **Lint code**: `npm run lint`

### Current Implementation Status

#### Frontend (StreamUnity-Front)
- ✅ **Next.js 15 Migration**: Complete migration from React + Vite to Next.js with App Router
- ✅ **SSR/SSG Support**: Server-side rendering and static generation configured
- ✅ **Route Structure**: App Router with pages for home (/), auth (/auth), and dashboard (/dashboard)
- ✅ **SimpleHome page**: Fully functional landing page with Hero, Features, and Pricing sections
- ✅ **Header component**: Reusable with variants for different pages (Next.js Link compatible)
- ✅ **Footer component**: Simple footer with branding and links
- ✅ **Platform components**: Icon and badge components for streaming platforms
- ✅ **Auth page**: Complete authentication with forms, validation, and API integration
- ✅ **Dashboard page**: Multi-tab dashboard with overview, profile, chat settings, and moderation
- ✅ **Custom hooks**: useAuth and useLocalStorage hooks (SSR compatible)
- ✅ **shadcn/ui**: 15+ components installed and configured
- ✅ **TypeScript**: All components properly typed with no errors

#### Backend (StreamUnity-API)
- ✅ **NestJS API**: Complete API setup with modular architecture
- ✅ **Authentication**: JWT-based auth with user registration and login
- ✅ **Database**: PostgreSQL with Prisma ORM and full schema
- ✅ **Real-time chat**: WebSocket gateway with Socket.IO
- ✅ **Chat moderation**: Message storage and moderation system
- ✅ **Docker setup**: PostgreSQL database with Docker Compose
- ✅ **API documentation**: Complete README with setup instructions

### Code Conventions
- Use TypeScript interfaces for all component props
- Add 'use client' directive for interactive components in Next.js
- Follow shadcn/ui component patterns and styling
- Maintain consistent dark theme design (purple/slate color scheme)
- Use Tailwind utility classes for styling
- Use `@/` path aliases for imports
- Implement proper form handling with validation
- Use Lucide React icons throughout the application
- Ensure SSR compatibility for all hooks and components
- Use Next.js Link component for internal navigation

### Architecture Patterns
- **Component isolation**: Each major feature has its own component
- **Next.js routing**: File-based routing with App Router instead of state-based navigation
- **Client-side interactivity**: 'use client' components for interactive features
- **Server-side rendering**: Pages rendered on server for better performance and SEO
- **Inline styling**: Tailwind classes with conditional logic for themes
- **API integration**: Dedicated services for backend communication
- **Responsive design**: Mobile-first approach with responsive breakpoints
- **Type safety**: Strongly typed components with TypeScript interfaces

### Known Issues
- ⚠️ **Database connection**: PostgreSQL needs to be running for the API to work
- ⚠️ **Platform APIs**: Streaming platform integrations need API credentials
- ⚠️ **Frontend-Backend connection**: Frontend API integration ready but needs testing with live backend

## Platform Integration Notes

The application is designed to integrate with:
- **Twitch** - Purple branding (`bg-purple-600`)
- **YouTube** - Red branding (`bg-red-600`)
- **TikTok** - Black branding (`bg-black`)
- **Facebook Gaming** - Blue branding (`bg-blue-600`)
- **Kick** - Green branding (`bg-green-600`)

Platform configuration is centralized in `src/lib/utils.ts` with the `PLATFORMS` constant. Each platform has dedicated connection fields and status indicators in the dashboard.

## Next Steps for Development

### Frontend Integration
1. **Test API Integration**: Test existing API integration with live backend
2. **Real-time chat UI**: Implement WebSocket connection in the frontend
3. **Dashboard data**: Connect dashboard to real user data from API
4. **Performance optimization**: Leverage Next.js features for better performance

### Platform Integration
1. **Twitch API**: Implement Twitch chat integration
2. **YouTube API**: Implement YouTube chat integration
3. **TikTok API**: Implement TikTok chat integration
4. **Facebook Gaming API**: Implement Facebook Gaming chat integration
5. **Kick API**: Implement Kick chat integration

### Additional Features
1. **Testing**: Add unit tests for both frontend and backend
2. **Next.js optimization**: Implement Image optimization, lazy loading, and dynamic imports
3. **Deployment**: Set up production deployment (Vercel for frontend, Railway/Heroku for backend)
4. **Documentation**: Add API documentation with OpenAPI/Swagger

## Quick Start Guide

### Running the Full Application

1. **Start the database**:
   ```bash
   cd StreamUnity-API
   docker-compose up -d
   ```

2. **Start the backend**:
   ```bash
   cd StreamUnity-API
   npm install
   npm run prisma:migrate
   npm run start:dev
   ```

3. **Start the frontend**:
   ```bash
   cd StreamUnity-Front
   npm install
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database GUI: `npm run prisma:studio` (from StreamUnity-API directory)