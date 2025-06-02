# FinAi – Smart Financial Advisor

FinAi is a smart financial advisor web application that helps users understand, plan, and improve their financial well-being.  
It analyzes income, expenses, and long-term obligations to determine whether users can afford specific goals, and provides AI-based financial suggestions.

---

## Features

- Add and manage monthly income, expenses, and future payments
- Analyze affordability of goals like vacations, new cars, or investments
- Personalized AI recommendations based on financial behavior using OpenAI
- Clean, user-friendly dashboard with real-time updates
- Secure authentication with Clerk
- PostgreSQL database hosted on Neon
- Multi-user support with protected data

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Neon) with Drizzle ORM
- **Authentication**: Clerk
- **API Communication**: Axios
- **AI Integration**: OpenAI API
- **ORM**: Drizzle

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/FinAi.git
cd FinAi


2. Install dependencies
npm install

3. Set up environment variables
# Neon Database
DATABASE_URL=postgresql://your-neon-user:your-password@your-neon-host/dbname

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_JWT_KEY=your-clerk-jwt-key

# OpenAI API Key
OPENAI_API_KEY=your-openai-api-key


4. Run the development server
npm run dev
