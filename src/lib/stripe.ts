import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

// Map plan names to Stripe Price IDs (monthly only)
export const STRIPE_PRICES: Record<string, { monthly: string }> = {
  base: {
    monthly: process.env.STRIPE_PRICE_BASE_MONTHLY!,
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
  },
  business: {
    monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY!,
  },
};
