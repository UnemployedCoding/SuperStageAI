import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

// Map plan names to Stripe Price IDs
export const STRIPE_PRICES: Record<string, { monthly: string; yearly: string }> = {
  base: {
    monthly: process.env.STRIPE_PRICE_BASE_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_BASE_YEARLY!,
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_PRO_YEARLY!,
  },
  business: {
    monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_BUSINESS_YEARLY!,
  },
};
