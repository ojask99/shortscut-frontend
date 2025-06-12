// # stripe listen --forward-to localhost:3000/api/webhooks/stripe

import Stripe from "stripe";
import { env } from "~/env";
import { db } from "~/server/db";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});
const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") ?? "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error("Webhook signature verification failed", error);
      return new Response("WebHook signature verification failed", {
        status: 400,
      }); //
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object; // type Stripe.Checkout.Session
      const customerId = session.customer as string;
      const retrievedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items"] },
      );

      const lineItems = retrievedSession.line_items;
      if (lineItems && lineItems.data.length > 0 && customerId) {
        const priceId = lineItems.data[0]?.price?.id ?? undefined;

        if (priceId) {
          let creditsToAdd = 0;

          if (priceId === env.STRIPE_SMALL_CREDIT_PACK) {
            creditsToAdd = 50;
          } else if (priceId === env.STRIPE_MEDIUM_CREDIT_PACK) {
            creditsToAdd = 150;
          } else if (priceId === env.STRIPE_LARGE_CREDIT_PACK) {
            creditsToAdd = 500;
          }

          await db.user.update({
            where: { stripeCustomerId: customerId },
            data: {
              credits: {
                increment: creditsToAdd,
              },
            },
          });
        } else {
            console.error("PriceId is null");
        }
      }
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Webhook error", {status: 500});
  }
}
