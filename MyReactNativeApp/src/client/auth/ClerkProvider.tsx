import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';

const publishableKey = 'your_clerk_publishable_key';

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
};

