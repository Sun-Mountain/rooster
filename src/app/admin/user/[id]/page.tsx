import { UserProfile } from "@/components/content/pages/UserProfile";
import { BackLink } from "@/components/BackLink";

export default function AdminUserProfileView() {
  return (
    <>
      <div className="profile-page-content">
        <BackLink href="/admin/users" label="Users" />
        <UserProfile />
      </div>
    </>
  );
}