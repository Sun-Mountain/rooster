'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserAccountProps } from '@/lib/types';
import { Button } from '@/components/_ui/Button';
import { AccountForm } from '@/components/forms/Account';

export const AccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState<UserAccountProps | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    if (showForm) return;

    fetch(`/api/user?id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setAccountInfo(data.user);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [userId, showForm]);

  return (
    <div className="account-info-container">
      <h1>Account Information</h1>
      <p>Here you can view and update your account information.</p>
      {accountInfo ? (
        <div className="account-details">
          {!showForm ? ( 
            <>
              <p><strong>Name:</strong> {accountInfo.firstName} {accountInfo.lastName}</p>
              <p><strong>Email:</strong> {accountInfo.email}</p>
              <p><strong>Address:</strong> {accountInfo.address ? (
                <>
                  <br />
                  {accountInfo.address.street},<br />
                  {accountInfo.address.street2 && (<>{accountInfo.address.street2},<br /></>)}
                  {accountInfo.address.city}, {accountInfo.address.state}, {accountInfo.address.zipCode}
                </>
              ) : (
                <>
                  No address on file. <Button className="text-style-btn" onClick={() => setShowForm(true)}>Add your address.</Button>
                </>
              )}</p>
              <p><strong>Phone Number:</strong> {accountInfo.phoneNumber ? `${accountInfo.phoneNumber.areaCode}-${accountInfo.phoneNumber.prefix}-${accountInfo.phoneNumber.lineNum}` : (
                <>
                  No phone number on file. <Button className="text-style-btn" onClick={() => setShowForm(true)}>Add your phone number.</Button>
                </>
              )}</p>
              <p className="divider-top"><strong>Emergency Contact:</strong><br /><br />
              {accountInfo.emergencyContact ? (
                  <>
                    <p>{accountInfo.emergencyContact.firstName} {accountInfo.emergencyContact.lastName} ({accountInfo.emergencyContact.relationship})</p>
                    <p>{accountInfo.emergencyContact.phoneNumber.areaCode}-{accountInfo.emergencyContact.phoneNumber.prefix}-{accountInfo.emergencyContact.phoneNumber.lineNum}</p>
                  </>
                ) : (
                  <>
                    No emergency contact on file. <Button className="text-style-btn" onClick={() => setShowForm(true)}>Add an emergency contact.</Button>
                  </>
                )}
              </p>
              <div>
                <Button className="text-style-btn" onClick={() => setShowForm(true)}>Edit Account Information</Button>
              </div>
            </>
          ) : (
            <>
              <AccountForm onCancel={() => setShowForm(false)} />
            </>
          )}
        </div>
      ) : (
        <p>Loading account information...</p>
      )}
    </div>
  );
}