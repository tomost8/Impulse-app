import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { useLocalSearchParams } from 'expo-router';
// GraphQL hooks
import { useGetCommunityLeaderboard } from '@/hooks/graphql/communities/queries';
// Components
import LeaderboardScreen from '@/components/screens/social/communities/leaderboardscreen';
// Debug
import { debugRenders } from '@/utils/debug';
import { useDataProvider } from '@/contexts/DataProviderContext';

const LeaderboardPage = () => { 
  const { id } = useLocalSearchParams(); // community ID
  //const { fetching, user } = useUserData();
  const [selectedPeriod, setSelectedPeriod] = useState<'POINTS_WEEKLY' | 'POINTS_MONTHLY' | 'POINTS_ALL'>('POINTS_WEEKLY');
  const [renderCounter, setRenderCounter] = useState(0);
  //console.log("communityId", id);

  const communityLeaderboardRef = useRef<any | null>(null);
  const hasFetchedCommunityLeaderboard = useRef(false);
  const { communityLeaderboard, fetched: hasNewCommunityLeaderboardData } = useGetCommunityLeaderboard(Number(id), selectedPeriod, !hasFetchedCommunityLeaderboard.current);

  useEffect(() => {
    if (!hasNewCommunityLeaderboardData) {
      return;
    }
    if (hasNewCommunityLeaderboardData) {
      // need to filter for only accepted + add points to the query
      const filteredLeaderboard = communityLeaderboard.filter((item: any) => item.status === 'ACCEPTED').map((item: any) => ({
        id: item.user.id,
        username: item.user.username,
        profile_picture: item.user.profile_picture,
        point: item.user.point
      }));
      communityLeaderboardRef.current = filteredLeaderboard;
      hasFetchedCommunityLeaderboard.current = true;
    }
    if (hasFetchedCommunityLeaderboard.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunityLeaderboardData]);

  const loading = !hasFetchedCommunityLeaderboard.current;
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
      communityLeaderboard={communityLeaderboardRef.current}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
    />
  );
};

export default AuthWrapper(LeaderboardPage);