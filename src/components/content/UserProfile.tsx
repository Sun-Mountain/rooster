'use client';

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  error?: string;
  role?: string;
  // Add other user properties as needed
}

interface ContactInfo {
  primaryEmail: string;
  secondaryEmail?: string;
  phone?: string;
  preferredContact?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userContact, setUserContact] = useState<ContactInfo | null>(null);
  const [userEmergencyContact, setUserEmergencyContact] = useState<string | null>(null);

  const pathname = usePathname();
  const userId = pathname.split('/').pop();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/admin/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserContacts = async () => {
      if (!userId) return;

      const response = await fetch(`/api/user/${userId}/contactInfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setUserContact(data);
    };
    fetchUserContacts();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  
  if (userData?.error) {
    return <div>{userData.error}</div>;
  }

  return (
    <div className="content-container">
      <h2>User Profile</h2>
      <div className="profile-container">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>ID:</strong> {userData.id}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>

      <h3>Contact Information</h3>
      <div className="profile-container">
        <p><strong>Primary Email:</strong> {userData.email}</p>
        <p><strong>Secondary Email:</strong> {userContact?.secondaryEmail || 'N/A'}</p>
        <p><strong>Phone:</strong> {userContact?.phone || 'N/A'}</p>
        <p><strong>Preferred Contact Method:</strong> {userContact?.preferredContact || 'N/A'}</p>
        <p><strong>Address:</strong></p>
      </div>
    </div>
  );
}