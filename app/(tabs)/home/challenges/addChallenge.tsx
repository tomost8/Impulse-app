import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL Hooks
import { useGetExploreChallenges } from '@/hooks/graphql/challenges/queries';
import { useJoinChallenge } from '@/hooks/graphql/challenges/mutations';
// Components
import AddChallengeScreen from '../../../../components/screens/home/AddChallengeScreen';
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
  const { challenges, success, errors, fetched: hasNewChallengesData } = useGetExploreChallenges(
    selectedCategory, 
    !hasFetchedChallenges.current && !fetching && !!user?.id
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
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewChallengesData]);

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
    console.log('Rendering AddChallengePage');
    
    if (challengesRef.current && challengesRef.current.length > 0) {
      console.log('Explore Challenges:');
      challengesRef.current.forEach((challengeItem: any, index: number) => {
        const challenge = challengeItem.challenge;
        console.log(`  ${index + 1}. ${challenge.title} (${challenge.category}) - ${challenge.length}`);
        console.log(`     Points: Bronze(${challenge.points_bronze}) Silver(${challenge.points_silver}) Gold(${challenge.points_gold}) Diamond(${challenge.points_diamond})`);
        console.log(`     Status: ${challengeItem.isJoined ? 'Joined' : 'Not Joined'} | ${challengeItem.isLocked ? 'Locked' : 'Available'}`);
      });
    } else {
      console.log('Explore Challenges: []');
    }
    
    console.log('Selected Category:', selectedCategory);
    console.log('Render Counter:', renderCounter);
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
