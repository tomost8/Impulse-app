import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

const TokenTestButton = () => {
  const { getTokenInfo, checkAndRefreshToken } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a delay to avoid interfering with app startup
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTokenTest = async () => {
    try {
      const tokenInfo = getTokenInfo();
      console.log('🧪 Token Info:', tokenInfo);
      
      if (tokenInfo) {
        Alert.alert(
          '🔐 Token Info',
          `Created: ${tokenInfo.createdAt}\nExpires: ${tokenInfo.expiresAt}\nTime Left: ${tokenInfo.timeUntilExpiry} minutes\nValid: ${tokenInfo.isValid ? '✅' : '❌'}`,
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Test Refresh', 
              onPress: async () => {
                console.log('🧪 Testing token refresh...');
                const success = await checkAndRefreshToken();
                console.log('🧪 Token refresh result:', success);
                Alert.alert('Token Refresh', success ? '✅ Refresh successful!' : '❌ Refresh failed');
              }
            }
          ]
        );
      } else {
        Alert.alert('Token Info', 'No token available');
      }
    } catch (error) {
      console.error('Token test error:', error);
      Alert.alert('Error', 'Failed to get token info');
    }
  };

  if (!isVisible) return null;

  return (
    <TouchableOpacity style={styles.tokenButton} onPress={handleTokenTest}>
      <Text style={styles.tokenButtonText}>🔐</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tokenButton: {
    position: 'absolute',
    top: 50,
    right: 70,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tokenButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default TokenTestButton;
