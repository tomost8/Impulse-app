import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL Hooks
import { useGetExploreChallenges } from '@/hooks/graphql/challenges/queries';
import { useJoinChallenge } from '@/hooks/graphql/challenges/mutations';
// Components
import AddChallengeScreen from '@/components/screens/home/AddChallengeScreen';
// Debug
import { debugRenders } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';

const AddChallengePage = () => {
  const { fetching, user } = useDataProvider();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [renderCounter, setRenderCounter] = useState(0);

  // Query for Loading State - Explore Challenges Only
  const challengesRef = useRef<any | null>(null);
  const hasFetchedChallenges = useRef(false);
  const lastFetchedCategory = useRef<string | undefined>(undefined);
  
  // Allow refetching when category changes or when first loading
  const shouldFetch = !fetching && !!user?.id && (
    !hasFetchedChallenges.current || 
    lastFetchedCategory.current !== selectedCategory
  );
  
  const { challenges, success, errors, fetched: hasNewChallengesData } = useGetExploreChallenges(
    selectedCategory, 
    shouldFetch
  );

  // Join Challenge Mutation
  const { joinChallenge, loading: isJoiningChallenge } = useJoinChallenge();

  useEffect(() => {
    if (!hasNewChallengesData) {
      return;
    }
    if (hasNewChallengesData) {
      challengesRef.current = challenges;
      hasFetchedChallenges.current = true;
      lastFetchedCategory.current = selectedCategory;
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChallengesData, selectedCategory]);

  const handleJoinChallenge = async (challengeId: number) => {
    console.log('Join Challenge button pressed for challenge ID:', challengeId);
    
    try {
      const result = await joinChallenge(challengeId);
      if (result.success) {
        console.log('Successfully joined challenge:', challengeId);
        // Optionally refresh the challenges data or navigate back
      } else {
        console.error('Failed to join challenge:', result.error);
      }
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  // Debug
  const loading = !hasFetchedChallenges.current;
  if (debugRenders && !loading) {
    let output = 'Rendering AddChallengePage\n';
    
    if (challengesRef.current && challengesRef.current.length > 0) {
      challengesRef.current.forEach((challengeItem: any, index: number) => {
        const challenge = challengeItem.challenge;
        const maxPoints = Math.max(challenge.points_bronze, challenge.points_silver, challenge.points_gold, challenge.points_diamond);
        const status = `${challengeItem.isJoined ? 'Joined' : 'Not Joined'} | ${challengeItem.isLocked ? 'Locked' : 'Available'}`;
        output += `  - ${challenge.title}, Max_points: ${maxPoints}, Status: ${status}\n`;
      });
    }
    
    output += `Selected Category: ${selectedCategory}\n`;
    output += `Render Counter: ${renderCounter}`;
    
    console.log(output);
  }

  return <AddChallengeScreen
    isLoading={loading}
    challenges={challengesRef.current}
    success={success}
    errors={errors}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
    onJoinChallenge={handleJoinChallenge}
    isJoiningChallenge={isJoiningChallenge}
  />;
}

export default AuthWrapper(AddChallengePage);
