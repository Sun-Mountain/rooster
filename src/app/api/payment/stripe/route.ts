import { NextResponse } from 'next/server';
import { getSession } from '@/lib/get-session';
import { createCheckoutSession } from './payment';
import { logger } from '@/helpers/logger';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const formData = await request.formData();
        const serviceName = String(formData.get('serviceName') || '').trim();
        const serviceDescription = String(formData.get('serviceDescription') || '').trim();
        const servicePrice = Number(formData.get('servicePrice') || NaN);

        if (!serviceName || !serviceDescription || !Number.isFinite(servicePrice) || servicePrice <= 0) {
            return NextResponse.json({ error: 'Invalid payment payload' }, { status: 400 });
        }

        const checkoutSession = await createCheckoutSession(serviceName, serviceDescription, servicePrice, user.id);

        return NextResponse.json({
            sessionId: checkoutSession.id,
            checkoutUrl: checkoutSession.url,
        });
    } catch (error) {
        logger.error(`Error creating checkout session: ${String(error)}`);
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
}