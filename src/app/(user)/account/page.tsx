import { AccountForm } from '@/components/forms/Account';

export default function Settings () {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p>Manage your account settings and preferences here.</p>
      <AccountForm />
    </div>
  );
}