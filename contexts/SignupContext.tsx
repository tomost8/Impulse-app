import React, { createContext, useContext, useState } from 'react';

interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  timezone: string;
  bio: string;
  code: string;
  communityId: string | null;
  primaryGoalId: number | null;
  secondaryGoalId: number | null;
}

interface SignupContextType {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    timezone: '',
    bio: '',
    code: '',
    communityId: null,
    primaryGoalId: null,
    secondaryGoalId: null,
  });

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (undefined === context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
} 