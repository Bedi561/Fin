import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface User {
  id: string;
  username: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const UserManagement: React.FC = () => {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleActivateDeactivate = async (userId: string, isActive: boolean) => {
    // Call API to activate/deactivate user
    await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive }),
    });
    // Refresh user list
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, isActive: !isActive } : u
    );
    setUsers(updatedUsers);
  };

  const handleResetCredentials = async (userId: string) => {
    // Call API to reset user credentials
    await fetch(`/api/users/${userId}/reset-credentials`, { method: 'POST' });
    alert('Credentials reset successfully');
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Usernames</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleActivateDeactivate(user.id, user.isActive)}>
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleResetCredentials(user.id)}>
                  Reset Credentials
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

