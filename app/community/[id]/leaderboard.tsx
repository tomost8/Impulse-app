import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { useLocalSearchParams } from 'expo-router';
// GraphQL hooks
import { useGetCommunityLeaderboard } from '@/hooks/graphql/communities/queries';
// Components
import LeaderboardScreen from '@/components/screens/social/communities/leaderboardscreen';
// Debug
import { debugRenders } from '@/utils/debug';
import { useUserData } from '@/services/UserPreferencesContext';

const LeaderboardPage = () => { 
  const { id } = useLocalSearchParams();
  const { fetching, user } = useUserData();
  const [selectedPeriod, setSelectedPeriod] = useState<'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL'>('POINTS_WEEKLY');
  const [renderCounter, setRenderCounter] = useState(0);
  console.log("communityId", id);

  const communityLeaderboardRef = useRef<any | null>(null);
  const hasFetchedCommunityLeaderboard = useRef(false);
  const { communityLeaderboard, fetched: hasNewCommunityLeaderboardData } = useGetCommunityLeaderboard(Number(id), selectedPeriod, !hasFetchedCommunityLeaderboard.current && !fetching);

  useEffect(() => {
    if (!hasNewCommunityLeaderboardData) {
      return;
    }
    if (hasNewCommunityLeaderboardData) {
      // need to filter for only accepted + add points to the query
      communityLeaderboardRef.current = communityLeaderboard;
      hasFetchedCommunityLeaderboard.current = true;
    }
    if (hasFetchedCommunityLeaderboard.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunityLeaderboardData]);

  const loading = !hasFetchedCommunityLeaderboard.current || fetching;
  if (debugRenders && !loading) {
    console.log('Rendering LeaderboardsPage\n',
      'Community Leaderboard:', communityLeaderboardRef.current, '\n',
      'Selected Period:', selectedPeriod, '\n',
      'Render Counter:', renderCounter, '\n',
    );
  }
  return (
    <LeaderboardScreen 
      isLoading={loading}
      communityLeaderboard={[]}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
    />
  );
};

export default AuthWrapper(LeaderboardPage);