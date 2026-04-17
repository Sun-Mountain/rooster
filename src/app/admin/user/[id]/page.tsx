import { UserProfile } from "@/components/UserProfile";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

export default function AdminUserProfileView() {
  return (
    <>
      <div className="profile-page-content">
        <a className="back-link" href="/admin/users">
          <KeyboardDoubleArrowLeft /> Back to Users
        </a>
        <UserProfile />
      </div>
    </>
  );
}