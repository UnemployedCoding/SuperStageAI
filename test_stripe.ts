import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" as any });

async function run() {
  const sub = await stripe.subscriptions.retrieve("sub_1TnZkyIeq52i3OHhdN6vdGnG");
  console.log("items:", sub.items?.data[0]);
  console.log("billing_cycle_anchor:", sub.billing_cycle_anchor);
}
run();
