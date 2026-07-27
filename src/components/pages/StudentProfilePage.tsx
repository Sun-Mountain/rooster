"use client";

import { useSession } from "@/lib/auth-client";
import { UserProps } from "@/lib/props";
import StudentSummary from '@/components/content/StudentSummary';
import StudentInfoForm from "@/components/forms/StudentInfo";
import EmergencyContactForm from "@/components/forms/EmergencyContact";
import Button from "@/components/.ui/Button";

const StudentProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user as UserProps | undefined;

  return (
    <div id="profile-page" className="user-dashboard-page-container">
      <StudentSummary user={user} />
      <StudentInfoForm />
      <EmergencyContactForm />
      <div>
        <Button>
          Save Profile
        </Button>
      </div>
    </div>
  )
}

export default StudentProfilePage;