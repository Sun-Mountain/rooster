import { logger } from "@/helpers/logger";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface CheckoutSessionResult {
    id: string;
    url: string | null;
}

// Create the payment details for a single service
async function createServicePayment(name: string, description: string, price: number) {
    const servicePayment = {
        price_data: {
            product_data: {
                name: name,
                description: description,
            },
            unit_amount: Math.round(price * 100), // Convert price to cents for Stripe's API
            currency: 'usd',
        },
        quantity: 1,
    }

    return servicePayment; 
}

async function createCheckoutSession(name: string, description: string, price: number, userId: string): Promise<CheckoutSessionResult> {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    try {
        const servicePayment = await createServicePayment(name, description, price);
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [servicePayment],
            mode: 'payment',
            success_url: `${baseUrl}/checkout_complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/profile`,
            client_reference_id: userId,
        });

        return {
            id: checkoutSession.id,
            url: checkoutSession.url,
        };
    } catch (error) {
        logger.error(`Error processing payment: ${String(error)}`);
        throw error;
    }
}

export { createCheckoutSession };