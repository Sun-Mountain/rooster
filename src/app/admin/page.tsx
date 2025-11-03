'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const response = await fetch('/api/admin/users/count');
      const data = await response.json();
      setUserCount(data.count);
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div>User Count: {userCount}</div>
    </>
  );
}
