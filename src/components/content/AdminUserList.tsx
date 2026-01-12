"use client";

import { User, Role } from "@client";
import { useEffect, useState } from "react";
import { ManageAccounts, Shield, Star } from "@mui/icons-material";

export const AdminUserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from an API or database
    const fetchUsers = async () => {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (<div>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-container">
          <table id="admin-user-table">
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td></td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <a href={`/admin/user/${user.id}`}>
                      <ManageAccounts />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}