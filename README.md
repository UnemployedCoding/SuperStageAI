# StageLumen

**StageLumen** is a state-of-the-art virtual staging SaaS web application designed for real estate agents and property managers. It transforms photos of empty rooms into fully furnished, listing-ready homes in under 45 seconds using advanced AI.

## Features
- **Instant Virtual Staging:** Upload empty room photos and get them staged instantly.
- **Multiple Design Styles:** Many interior design styles available (Modern, Scandinavian, Luxury, Coastal, Farmhouse, etc.).
- **Affordable Pricing:** Monthly subscriptions starting from $39/month (less than $1.30 per generated image).
- **Interactive Before & After Gallery:** Compare the original and staged versions of the rooms with an interactive drag slider.
- **Secure Payments:** Integrated with Stripe for fast and secure subscription management.
- **User Dashboard:** A seamless user portal to view staging history, manage billing, and stage new photos.

## Tech Stack
- **Frontend Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4
- **Backend API:** Custom proxy route connected to the [MNML.ai](https://mnml.ai/) API (using the ArchDiffusion v4.3 model)
- **Database & Authentication:** [Supabase](https://supabase.com)
- **Payments:** [Stripe](https://stripe.com)

## Getting Started

### Prerequisites
- Node.js (v18+)
- A [Supabase](https://supabase.com) project (for auth and database)
- A [Stripe](https://stripe.com) account (for billing)
- A [MNML.ai](https://mnml.ai) API key

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file and add your environment variables:
   ```env
   MNML_API_KEY="your_mnml_api_key"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_pub_key"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
   STRIPE_PRICE_BASE_MONTHLY="your_price_id"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
