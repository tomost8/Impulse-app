import React, { useState, useEffect, useRef } from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL Hooks
import { useGetMyChallenges } from '@/hooks/graphql/challenges/queries';
// Components
import ViewChallengesScreen from '../../../../components/screens/home/ViewChallengesScreen';
// Debug
import { debugRenders } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';

const ChallengesPage = () => {
  const { fetching, user } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);

  // Query for Loading State - My Challenges Only
  const myChallengesRef = useRef<any | null>(null);
  const hasFetchedMyChallenges = useRef(false);
  const { activeChallenges, completedChallenges, success, errors, fetched: hasNewMyChallengesData } = useGetMyChallenges(
    !hasFetchedMyChallenges.current && !fetching && !!user?.id
  );

  useEffect(() => {
    if (!hasNewMyChallengesData) {
      return;
    }
    if (hasNewMyChallengesData) {
      myChallengesRef.current = { activeChallenges, completedChallenges };
      hasFetchedMyChallenges.current = true;
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewMyChallengesData]);

  // Debug
  const loading = !hasFetchedMyChallenges.current;
  if (debugRenders && !loading) {
    const myChallenges = myChallengesRef.current;
    console.log('Rendering ChallengesPage\n' +
      `Active Challenges: ${myChallenges?.activeChallenges?.length || 0}\n` +
      `Completed Challenges: ${myChallenges?.completedChallenges?.length || 0}\n` +
      `Render Counter: ${renderCounter}`);
  }

  return <ViewChallengesScreen
    isLoading={loading}
    myChallenges={myChallengesRef.current}
  />;
}

export default AuthWrapper(ChallengesPage);
