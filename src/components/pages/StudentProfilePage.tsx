"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { UserProps, UserInfoProps } from "@/lib/props";
import StudentSummary from '@/components/content/StudentSummary';
import StudentInfoForm from "@/components/forms/StudentInfo";
import EmergencyContactForm from "@/components/forms/EmergencyContact";
import Button from "@/components/.ui/Button";
import { getOrCreateContactInfo } from "@/lib/api/userContactInfo";
import { updateUser } from "@/lib/auth-client";

const StudentProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user as UserProps | undefined;

  const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;
      try {
        const contactInfo = await getOrCreateContactInfo(user.id);
        const emergencyContact = await fetch(`/api/user/emergency?userId=${user.id}`);
        const emergencyData = await emergencyContact.json();
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
            name: emergencyData?.name || "",
            relationship: emergencyData?.relationship || "",
            phone: emergencyData?.phone || ""
          }
        });
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserInfo();
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
    updateUser({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
    });
  }

  return (
    <div id="profile-page" className="user-dashboard-page-container">
      <StudentSummary user={user} />
      <StudentInfoForm userInfo={userInfo} setUserInfo={setUserInfo} />
      <EmergencyContactForm emergencyContact={userInfo?.emergency} setUserInfo={setUserInfo} />
      <div>
        <Button onClick={saveChanges}>
          Save Profile
        </Button>
      </div>
    </div>
  )
}

export default StudentProfilePage;