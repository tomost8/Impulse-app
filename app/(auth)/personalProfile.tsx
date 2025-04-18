import { useEffect, useRef } from 'react';
import { useGetCommunities } from '@/hooks/graphql/communities/queries';

import PersonalProfileScreen from '@/components/screens/SignupLogin/Signup/personalProfile';

// Signup Page 2
export default function PersonalProfile() {

  // Queries for Loading State
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
