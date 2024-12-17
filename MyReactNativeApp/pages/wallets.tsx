import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Wallet {
  id: string;
  userId: string;
  balance: number;
  isFrozen: boolean;
}

const WalletManagement: React.FC = () => {
  const { user } = useUser();
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    // Fetch wallets from API
    const fetchWallets = async () => {
      const response = await fetch('/api/wallets');
      const data = await response.json();
      setWallets(data);
    };
    fetchWallets();
  }, []);

  const handleFreezeUnfreeze = async (walletId: string, isFrozen: boolean) => {
    // Call API to freeze/unfreeze wallet
    await fetch(`/api/wallets/${walletId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFrozen: !isFrozen }),
    });
    // Refresh wallet list
    const updatedWallets = wallets.map(w => 
      w.id === walletId ? { ...w, isFrozen: !isFrozen } : w
    );
    setWallets(updatedWallets);
  };

  return (
    <div>
      <h1>Wallet Management</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet) => (
            <tr key={wallet.id}>
              <td>{wallet.userId}</td>
              <td>${wallet.balance.toFixed(2)}</td>
              <td>{wallet.isFrozen ? 'Frozen' : 'Active'}</td>
              <td>
                <button onClick={() => handleFreezeUnfreeze(wallet.id, wallet.isFrozen)}>
                  {wallet.isFrozen ? 'Unfreeze' : 'Freeze'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletManagement;

