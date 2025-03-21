import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetCommunities, useGetUserCommunities, useGetAllCategories } from '@/hooks/graphql/communities/queries';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';
// Components
import ExploreScreen from '@/components/screens/social/explorescreen';
// Debug
import { debugRenders } from '@/utils/debug';
// Services
import { useUserData } from '@/services/UserPreferencesContext';


const ExplorePage = () => {
  const { fetching, user } = useUserData();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communities, fetched: hasNewCommunitiesData } = useGetCommunities(!hasFetchedCommunities.current);

  const userCommunitiesRef = useRef<any[] | null>(null);
  const hasFetchedUserCommunities = useRef(false);
  const { communityMembers, fetched: hasNewUserCommunitiesData } = useGetUserCommunities(user.id, !hasFetchedUserCommunities.current && !fetching);

  const categoriesRef = useRef<any[] | null>(null);
  const hasFetchedCategories = useRef(false);
  const { categories, fetched: hasNewCategoriesData } = useGetAllCategories(!hasFetchedCategories.current);

  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewUserCommunitiesData && !hasNewCategoriesData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = communities;
      hasFetchedCommunities.current = true;
    }
    if (hasNewUserCommunitiesData) {
      userCommunitiesRef.current = communityMembers;
      hasFetchedUserCommunities.current = true;
    }
    if (hasNewCategoriesData) {
      categoriesRef.current = categories;
      hasFetchedCategories.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedUserCommunities.current && hasFetchedCategories.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData, hasNewUserCommunitiesData, hasNewCategoriesData]);

  // Mutations
  const { createCommunityMember } = useCreateCommunityMember();
  const [isCreatingCommunityMember, setIsCreatingCommunityMember] = useState(false);
  const handleCreateCommunityMember = async (communityId: number) => {
    setIsCreatingCommunityMember(true);
    try {
      const input = {
        community_id: communityId,
        user_id: user.id
      };
      const response = await createCommunityMember(input);
      if (response.success) {
        console.log("Community Member created successfully:", response);
      } else {
        console.error("Error creating community member:", response);
      }
    } catch (error) {
      console.error("Error creating community member:", error);
    } finally {
      setIsCreatingCommunityMember(false);
    }
  }

  // Search + Filtering
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // Get communities not in userCommunities and filter by selectedGoal
  const filteredCommunities = communitiesRef.current?.filter((community: any) => 
    !userCommunitiesRef.current?.some((userCommunity: any) => userCommunity.community.id === community.id) &&
    (selectedGoal === null || categoriesRef.current?.some((category: any) => 
      category.community_id === community.id && category.category === selectedGoal
    ))
  );

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedUserCommunities.current || !hasFetchedCategories.current;
  if (debugRenders && !loading) {
    console.log("Rendering ExplorePage\n",
      "Communities:", communitiesRef.current, "\n",
      "Selected Goal:", selectedGoal, "\n",
      "Filtered Communities:", filteredCommunities, "\n",
      "User:", user, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <ExploreScreen 
      loading={loading}
      communities={filteredCommunities || []}
      selectedCategory={selectedGoal || ''}
      handleCategorySelect={setSelectedGoal}
      handleJoinCommunity={handleCreateCommunityMember}
    />
  );
}

export default AuthWrapper(ExplorePage);