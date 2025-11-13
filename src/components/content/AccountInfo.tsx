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
              <Button className="text-style-btn" onClick={() => setShowForm(true)}>Edit Account Information</Button>
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