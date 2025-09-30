import { useEffect, useRef } from 'react';
import { useGetCommunities } from '@/hooks/graphql/communities/queries';
import PersonalProfileScreen from '@/components/screens/auth/PersonalProfileScreen';

// Signup Page 2
export default function PersonalProfile() {
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communities, fetched: hasNewCommunitiesData } = useGetCommunities(!hasFetchedCommunities.current);

  useEffect(() => {
    if (!hasNewCommunitiesData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communities;
      hasFetchedCommunities.current = true;
    }
  }, [hasNewCommunitiesData]);

  const loading = !hasFetchedCommunities.current;
  
  return <PersonalProfileScreen 
    loading={loading} 
    communities={communities} 
  />;
}
