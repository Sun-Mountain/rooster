'use client';

import { useEffect, useState } from "react";
import { Role } from "@client";
import { usePathname } from 'next/navigation';
import { DeleteModal } from "@/components/modals/DeleteModal";

interface UserData {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  pronouns?: string;
  email?: string;
  error?: string;
  role?: Role;
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

interface EmergencyContact {
  firstName?: string;
  lastName?: string;
  phone?: string;
  relationship?: string;
}

export const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userContact, setUserContact] = useState<ContactInfo | null>(null);
  const [userEmergencyContact, setUserEmergencyContact] = useState<EmergencyContact | null>(null);

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

  useEffect(() => {
    const fetchEmergencyContact = async () => {
      if (!userId) return;

      const response = await fetch(`/api/user/${userId}/emergencyContact`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUserEmergencyContact(data);
    };
    fetchEmergencyContact();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  
  if (userData?.error || !userData.id) {
    return <div>{userData.error}</div>;
  }

  return (
    <div className="page-container">
      <h2>User: {userData.name} {userData.pronouns && `(${userData.pronouns})`}</h2>
        <div className="profile-container">
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Pronouns:</strong> {userData.pronouns ? userData.pronouns : 'not given'}</p>
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

        <h3>Emergency Contact</h3>
        <div className="profile-container">
          <p><strong>Name:</strong> {userEmergencyContact?.firstName} {userEmergencyContact?.lastName}</p>
          <p><strong>Phone:</strong> {userEmergencyContact?.phone || 'N/A'}</p>
          <p><strong>Relationship:</strong> {userEmergencyContact?.relationship || 'N/A'}</p>
        </div>
      <div>
        <DeleteModal id={userData.id} name={userData.name} type="user" />
      </div>
    </div>
  );
}