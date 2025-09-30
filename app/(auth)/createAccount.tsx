import { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { useSignup } from '@/contexts/SignupContext';
import { useGetAllUsernames } from '@/hooks/graphql/users/queries';

import CreateAccountScreen from '@/components/screens/SignupLogin/Signup/createaccount';

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export default function CreateAccount() {
  const { signupData } = useSignup();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isValidating, setIsValidating] = useState(false);
  
  const usernamesRef = useRef<string[] | null>(null);
  const hasFetchedUsernames = useRef(false);
  const { usernames, fetched: hasNewUsernamesData } = useGetAllUsernames(!hasFetchedUsernames.current);

  useEffect(() => {
    if (!hasNewUsernamesData) {
      return;
    }
    if (hasNewUsernamesData) {
      usernamesRef.current = usernames;
      hasFetchedUsernames.current = true;
    }
  }, [hasNewUsernamesData]);


  const validateAllFields = async (): Promise<FieldErrors> => {
    const errors: FieldErrors = {};

    try {
      // 1. First Name validation: 1 to 100 characters
      if (!signupData.firstName || signupData.firstName.trim() === '') {
        errors.firstName = 'First name is required';
      }

      // 2. Last Name validation: 1 to 100 characters
      if (!signupData.lastName || signupData.lastName.trim() === '') {
        errors.lastName = 'Last name is required';
      }

      // 3. Username validation: 2 to 255 characters
      if (!signupData.username || signupData.username.trim() === '') {
        errors.username = 'Username is required';
      } else {
        if (signupData.username.length < 2) {
          errors.username = 'Username must be at least 2 characters';
        } else if (hasFetchedUsernames.current && usernamesRef.current) {
          // Check username availability (although uniqueness not enforced in backend)
          const usernameLower = signupData.username.toLowerCase();
          if (usernamesRef.current.includes(usernameLower)) {
            errors.username = 'Username is already taken';
          }
        }
      }

      // 4. Email validation: availablity checked later
      if (!signupData.email || signupData.email.trim() === '') {
        errors.email = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signupData.email)) {
          errors.email = 'Invalid email format';
        }
      }

      // 5. Password validation
      if (!signupData.password || signupData.password.trim() === '') {
        errors.password = 'Password is required';
      } else if (signupData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      return errors;
    } catch (error) {
      console.error('Error during validation:', error);
      return {
        username: hasFetchedUsernames.current ? 'Failed to check username availability' : 'Loading username data...'
      };
    }
  };

  const validateAndProceed = async () => {
    setIsValidating(true);
    
    const errors = await validateAllFields();
    setFieldErrors(errors);
    
    setIsValidating(false);
    
    // If no errors, navigate to PersonalProfile
    if (Object.keys(errors).length === 0) {
      router.push('/(auth)/personalProfile');
    }
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const loading = !hasFetchedUsernames.current;

  return (
    <CreateAccountScreen 
      fieldErrors={fieldErrors}
      isValidating={isValidating}
      validateAndProceed={validateAndProceed}
      clearFieldError={clearFieldError}
    />
  );
}