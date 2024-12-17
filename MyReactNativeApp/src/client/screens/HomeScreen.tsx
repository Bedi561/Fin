import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

const HomeScreen: React.FC = () => {
  const { user } = useUser();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch wallet balance from API
    // Update setBalance with the fetched value
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.username}!</Text>
      <Text style={styles.balance}>Wallet Balance: ${balance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
  balance: {
    fontSize: 18,
  },
});

export default HomeScreen;

