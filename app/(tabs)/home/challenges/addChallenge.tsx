import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL Hooks
import { useGetExploreChallenges } from '@/hooks/graphql/challenges/queries';
// Components
import AddChallengeScreen from '@/components/screens/home/AddChallengeScreen';
// Debug
import { debugRenders } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';

const AddChallengePage = () => {
  const { fetching, user } = useDataProvider();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [renderCounter, setRenderCounter] = useState(0);

  const challengesRef = useRef<any | null>(null);
  const hasFetchedChallenges = useRef(false);
  const lastFetchedCategory = useRef<string | undefined>(undefined);
  // Allow refetching when category changes or when first loading
  const shouldFetch = !fetching && !!user?.id && (
    !hasFetchedChallenges.current || 
    lastFetchedCategory.current !== selectedCategory
  );
  const { challenges, fetched: hasNewChallengesData } = useGetExploreChallenges(
    selectedCategory, 
    shouldFetch
  );

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

  // Debug
  const loading = !hasFetchedChallenges.current;
  if (debugRenders && !loading) {
    const challengesCount = challengesRef.current?.length || 0;
    console.log(`Rendering AddChallengePage - Challenges: ${challengesCount}, Category: ${selectedCategory || 'all'}, Render Counter: ${renderCounter}`);
  }

  return <AddChallengeScreen
    isLoading={loading}
    challenges={challengesRef.current}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
  />;
}

export default AuthWrapper(AddChallengePage);
