import { AccountForm } from '@/components/forms/Account';

export default function AccountPage () {
  return (
    <div className="content-container">
      <h1>Settings</h1>
      <p>Manage your account settings and preferences here.</p>
      <AccountForm />
    </div>
  );
}