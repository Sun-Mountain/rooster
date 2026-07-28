"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { UserProps } from "@/lib/props";
import StudentSummary from '@/components/content/StudentSummary';
import StudentInfoForm from "@/components/forms/StudentInfo";
import EmergencyContactForm from "@/components/forms/EmergencyContact";
import Button from "@/components/.ui/Button";

const StudentProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user as UserProps | undefined;

  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    contact: {
      street1?: string;
      street2?: string;
      city?: string;
      state?: string;
      zip?: string;
      phone?: string;
    };
    emergency: {
      name?: string;
      relationship?: string;
      phone?: string;
    }
  } | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;
      try {
        const contactInfo = await fetch(`/api/user/contact?userId=${user.id}`);
        const contactData = await contactInfo.json();
        const emergencyContact = await fetch(`/api/user/emergency?userId=${user.id}`);
        const emergencyData = await emergencyContact.json();
        setUserInfo({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          contact: {
            street1: contactData?.street1 || "",
            street2: contactData?.street2 || "",
            city: contactData?.city || "",
            state: contactData?.state || "",
            zip: contactData?.zip || "",
            phone: contactData?.phone || ""
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

  return (
    <div id="profile-page" className="user-dashboard-page-container">
      <StudentSummary user={user} />
      <StudentInfoForm user={user} />
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