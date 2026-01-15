'use client';

import { useState } from 'react';
import { AccountContactForm } from '@/components/forms/components/AccountContact';
import { AccountAddressForm } from '@/components/forms/components/AccountAddress';
import { AccountEmergencyContactForm } from '@/components/forms/components/AccountEmergencyContact';
import { AccountInfoForm } from '@/components/forms/components/AccountInfo';
import { User } from '@/lib/auth';

interface AccountFormProps {
  user: User;
}

export interface MissingInfoProps {
  firstName: boolean;
  lastName: boolean;
  userPhone: boolean;
  street1: boolean;
  city: boolean;
  state: boolean;
  zip: boolean;
  emergencyFirstName: boolean;
  emergencyLastName: boolean;
  emergencyPhone: boolean;
}

export const AccountForm = ({ user }: AccountFormProps) => {
  const [missingInfo, setMissingInfo] = useState<MissingInfoProps>({
    firstName: false,
    lastName: false,
    userPhone: false,
    street1: false,
    city: false,
    state: false,
    zip: false,
    emergencyFirstName: false,
    emergencyLastName: false,
    emergencyPhone: false,
  });

  const anyMissing = Object.values(missingInfo).some(value => value);

  const missingInfoMessage = anyMissing ? (
    <div className="alert error transparent">
      <div>
        You are missing the following required information:
        <ul>
          {missingInfo.firstName && <li>First Name</li>}
          {missingInfo.lastName && <li>Last Name</li>}
          {missingInfo.userPhone && <li>Phone Number</li>}
          {missingInfo.street1 && <li>Street Address</li>}
          {missingInfo.city && <li>City</li>}
          {missingInfo.state && <li>State</li>}
          {missingInfo.zip && <li>Zip Code</li>}
          {missingInfo.emergencyFirstName && <li>Emergency Contact First Name</li>}
          {missingInfo.emergencyLastName && <li>Emergency Contact Last Name</li>}
          {missingInfo.emergencyPhone && <li>Emergency Contact Phone Number</li>}
        </ul>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div>
        {missingInfoMessage}
      </div>
      <AccountInfoForm user={user} setMissingInfo={setMissingInfo} missingInfo={missingInfo} />
      <AccountContactForm userId={user.id} userEmail={user.email} setMissingInfo={setMissingInfo} missingInfo={missingInfo} />
      <AccountAddressForm userId={user.id} setMissingInfo={setMissingInfo} missingInfo={missingInfo} />
      <AccountEmergencyContactForm userId={user.id} setMissingInfo={setMissingInfo} missingInfo={missingInfo} />
    </>
  );
}