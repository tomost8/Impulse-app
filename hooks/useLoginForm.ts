/*
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from './useAuth';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // On successful login, navigate to home
      router.replace('/(tabs)/home');
    } catch (error) {
      // Error is handled by the hook, but you can add additional handling here
      console.log('Login failed');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
}; */