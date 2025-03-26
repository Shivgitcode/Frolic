# Frolic - Video Streaming Platform

A modern video streaming platform built with TypeScript, offering a YouTube-like experience for content creators and viewers. Frolic enables users to upload, share, and discover video content in a seamless and engaging environment.

## 🌟 Features

### For Viewers
- Browse and search videos
- Watch videos in high quality
- Like, comment, and share videos
- Subscribe to content creators
- Create and manage playlists
- Personalized video recommendations

### For Content Creators
- Upload and manage video content
- Customize video thumbnails and descriptions
- Track video analytics and engagement
- Interact with your audience through comments
- Manage your channel and subscriber base

## 🚀 Project Structure

```
frolic/
├── frontend/          # React + TypeScript frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
├── backend/           # Hono + TypeScript backend application
│   ├── src/
│   │   ├── container/    # Video processing container
│   │   ├── database/     # Database migrations and schema
│   │   ├── redis/        # Redis worker for background jobs
│   │   └── routes/       # API routes
└── package.json       # Root package.json for shared dependencies
```

## 🛠️ Tech Stack

### Frontend
- React 19 with TypeScript
- Vite 6 for fast development and building
- TanStack Router for type-safe routing
- TanStack Query for efficient data fetching
- Shadcn UI for beautiful components
- Tailwind CSS for styling
- React Hook Form with Zod validation
- Sonner for toast notifications
- Recharts for analytics visualization
- Biome for code formatting and linting

### Backend
- Hono.js for fast and modern API routing
- Drizzle ORM with PostgreSQL for data storage
- BullMQ with Redis for background job processing
- AWS S3 for video storage
- Better Auth for authentication
- Winston for logging
- Zod for runtime type validation

### Video Processing
- FFmpeg for video processing
- AWS ECS for containerized video processing
- AWS S3 for video storage

## 📦 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Git
- PostgreSQL database
- Redis server
- AWS account with:
  - S3 bucket for video storage
  - ECS cluster for video processing
  - IAM user with appropriate permissions

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd frolic
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   PORT=3000
   SECRET_ACCESS_KEY=your_aws_secret_key
   ACCESS_KEY=your_aws_access_key
   DATABASE_URL=your_postgresql_url
   ```

4. Set up the database:
```bash
cd backend
pnpm db:migrate
```

5. Start the development servers:

Frontend:
```bash
cd frontend
pnpm dev
```

Backend:
```bash
cd backend
pnpm dev
```

Video Processing Worker:
```bash
cd backend
pnpm dev:worker
```

## 🧪 Available Scripts

### Frontend
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run Biome linting
- `pnpm format` - Format code with Biome

### Backend
- `pnpm dev` - Start development server
- `pnpm dev:worker` - Start Redis worker
- `pnpm db:migrate` - Run database migrations
- `pnpm lint` - Run Biome linting
- `pnpm format` - Format code with Biome

## 🔧 Configuration

### Frontend
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - Shadcn UI configuration

### Backend
- `drizzle.config.ts` - Database configuration
- `.env` - Environment variables
- `tsconfig.json` - TypeScript configuration
