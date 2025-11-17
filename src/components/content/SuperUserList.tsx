'use client';

import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { Checkbox } from '../_ui/Checkbox';

const SuperUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    fetch('/api/super/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setUsers(data.users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <ul className="table">
          {users.map(user => (
            <li key={user.id}>
              <Checkbox />
              <div className="row-content">
                {user.firstName} {user.lastName}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default SuperUserList;