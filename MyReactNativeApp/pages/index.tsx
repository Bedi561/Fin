import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

const AdminDashboard: React.FC = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><a href="/users">Manage Users</a></li>
          <li><a href="/wallets">Manage Wallets</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;

