import { notFound } from 'next/navigation';
import { getSession } from '@/lib/get-session';
import { isSignedIn } from '@/helpers/isSignedIn';
import { PaymentTestForm } from '@/components/forms/PaymentTestForm';


export default async function PaymentTestPage() {
    await isSignedIn();

    const session = await getSession();
    const user = session?.user;

    if (!user) notFound();


    return (
        <div className="profile-page-content">
            <h1>Payment Test</h1>
            <p>Welcome, {user?.name}!</p>
            <PaymentTestForm />
        </div>
    );
}