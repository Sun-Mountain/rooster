import { ChangePasswordForm } from "@/components/forms/ChangePassword";

export default function AccountPage () {
  return (
    <div className="content-container">
      <h1>Settings</h1>
      <p>Manage your account settings and preferences here.</p>
      <div className="divider-top">
        <ChangePasswordForm />
      </div>
    </div>
  );
}