"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { UserProps, UserInfoProps } from "@/lib/props";
import Skeleton from '@mui/material/Skeleton';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import StudentSummary from '@/components/content/StudentSummary';
import StudentInfoForm from "@/components/forms/StudentInfo";
import EmergencyContactForm from "@/components/forms/EmergencyContact";
import Button from "@/components/.ui/Button";
import { getOrCreateContactInfo } from "@/lib/api/userContactInfo";
import { getOrCreateEmergencyContact } from "@/lib/api/userEmergencyContact";
import { updateUser } from "@/lib/auth-client";

const StudentProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user as UserProps | undefined;

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      if (!user) return;
      try {
        const contactInfo = await getOrCreateContactInfo(user.id);
        const emergencyContactResponse = await getOrCreateEmergencyContact(user.id);
        setUserInfo({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          contact: {
            street1: contactInfo?.street1 || "",
            street2: contactInfo?.street2 || "",
            city: contactInfo?.city || "",
            state: contactInfo?.state || "",
            zip: contactInfo?.zip || "",
            phone: contactInfo?.phone || ""
          },
          emergency: {
            name: emergencyContactResponse?.name || "",
            relationship: emergencyContactResponse?.relationship || "",
            phone: emergencyContactResponse?.phone || ""
          }
        });
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo().finally(() => setIsLoading(false));
  }, [user]);

  const saveChanges = async () => {
    if (!user || !userInfo) return;
    await fetch(`/api/user/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id, body: userInfo?.contact }),
    });
    await fetch(`/api/user/emergency`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id, body: userInfo?.emergency }),
    });
    updateUser({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
    });
  }

  return (
    <div id="profile-page" className="user-dashboard-page-container">
      {isLoading ? <Skeleton variant="rounded" width="100%" height={118} /> : <StudentSummary user={user} />}
      {isLoading ? <Skeleton variant="rounded" width="100%" height={118} /> : <StudentInfoForm userInfo={userInfo} setUserInfo={setUserInfo} />}
      {isLoading ? <Skeleton variant="rounded" width="100%" height={118} /> : <EmergencyContactForm emergencyContact={userInfo?.emergency} setUserInfo={setUserInfo} />}
      {!isLoading && (
        <div className="button-container">
          <Button className="w-icon" onClick={saveChanges}>
            <SaveOutlinedIcon /> Save Profile
          </Button>
        </div>
      )}
    </div>
  )
}

export default StudentProfilePage;