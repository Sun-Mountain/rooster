'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [userCount, setUserCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const response = await fetch('/api/admin/users/count');
      const data = await response.json();
      setUserCount(data.count);
    };

    const fetchSessionCount = async () => {
      const response = await fetch('/api/admin/sessions/count');
      const data = await response.json();
      setSessionCount(data.count);
    };

    const fetchClassCount = async () => {
      const response = await fetch('/api/admin/classes/count');
      const data = await response.json();
      setClassCount(data.count);
    };

    fetchUserCount();
    fetchSessionCount();
    fetchClassCount();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div>User Count: {userCount}</div>
      <div>Session Count: {sessionCount}</div>
      <div>Class Count: {classCount}</div>
    </>
  );
}
