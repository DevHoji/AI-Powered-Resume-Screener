# AI Resume Analyzer

A modern web application that analyzes resumes and provides detailed feedback on content, format, and additional aspects.

## Features

- Modern, responsive UI built with Next.js and Tailwind CSS
- Drag and drop file upload
- Support for PDF and DOCX files
- Detailed feedback with scores and suggestions
- Interactive charts and visualizations
- Clean and intuitive user interface

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   NEXT_PUBLIC_MEASUREMENT_ID=your_google_analytics_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- PostHog Analytics
- Google Analytics
- Recharts for data visualization
- React Hot Toast for notifications
- Radix UI for accessible components

## Project Structure

- `/src/app` - Next.js App Router files
  - `_components/` - Main application components
    - `HeroContainer.tsx` - File upload logic
    - `HeroPresentation.tsx` - Upload UI component
    - `ResultPresentation.tsx` - Analysis results display
  - `result/[id]/` - Dynamic route for displaying results
  - `providers.tsx` - PostHog provider setup
  - `layout.tsx` - Root layout with analytics
- `/src/components` - Reusable UI components
  - `DetailScore.tsx` - Feedback details component
  - `ScoreCard.tsx` - Score display component
  - `BarChartCard.tsx` - Chart visualization
  - `LoadingSpinner.tsx` - Loading indicator
- `/src/lib` - Utility functions
- `/src/constant` - Constants and configuration

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_BACKEND_URL` - URL of your backend API
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL
- `NEXT_PUBLIC_MEASUREMENT_ID` - Google Analytics measurement ID

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
