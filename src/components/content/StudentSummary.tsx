"use client";

import { UserProps } from "@/lib/props";

interface StudentSummaryProps {
  user?: UserProps;
}

const StudentSummary = ({ user }: StudentSummaryProps) => {
  const userInitials = () => {
    if (user) {
      const firstInitial = user.firstName.slice(0, 1);
      const lastInitial = user.lastName.slice(0, 1);
      return `${firstInitial}${lastInitial}`;
    }
    return "";
  }

  return (
    <div id="student-profile" className="content-section">
      <div className="section-content">
        <div>
          <div className="user-profile-avatar">
            {userInitials()}
          </div>
        </div>
        <div className="student-info">
          <div>
            <h3>{user?.firstName} {user?.lastName}</h3>
          </div>
          <div>
            {user?.email}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSummary;