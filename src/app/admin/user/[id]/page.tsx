import { UserProfile } from "@/components/content/UserProfile";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";

export default function AdminUserProfileView() {
  return (
    <>
      <a className="back-link" href="/admin/users">
        <KeyboardDoubleArrowLeft /> Back to Users
      </a>
      <UserProfile />
    </>
  );
}