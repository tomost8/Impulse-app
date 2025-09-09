import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
import { useGetCommunities, useGetUserCommunities, useGetAllCategories, useGetAllCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';
// Components
import ExploreScreen from '@/components/screens/social/ExploreScreen';
// Debug
import { debugExplorePage } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useDataRefetch } from '@/contexts/DataFetcher';
import { getLabelByCategory } from '@/utils/goals';


const ExplorePage = () => {
  const { fetching, user, communities } = useDataProvider();
  const { refetchData, isRefetching } = useDataRefetch();
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communities: allCommunities, fetched: hasNewCommunitiesData } = useGetCommunities(!hasFetchedCommunities.current);

  const categoriesRef = useRef<any[] | null>(null);
  const hasFetchedCategories = useRef(false);
  const { categories, fetched: hasNewCategoriesData } = useGetAllCategories(!hasFetchedCategories.current);

  const membersRef = useRef<any[] | null>(null);
  const hasFetchedMembers = useRef(false);
  const { communityMembers: allCommunityMembers, fetched: hasNewMembersData } = useGetAllCommunityMembers(!hasFetchedMembers.current);

  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewCategoriesData && !hasNewMembersData) {
      return;
    }
    if (hasNewCommunitiesData) {
      communitiesRef.current = allCommunities;
      hasFetchedCommunities.current = true;
    }
    if (hasNewCategoriesData) {
      categoriesRef.current = categories;
      hasFetchedCategories.current = true;
    }
    if (hasNewMembersData) {
      membersRef.current = allCommunityMembers;
      hasFetchedMembers.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedCategories.current && hasFetchedMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData, hasNewCategoriesData, hasNewMembersData]);

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
        // Refetch communities data to update the UI
        await refetchData({ communities: true });
        // Force re-render after refetch
        setRenderCounter(prev => prev + 1);
      } else {
        console.error("Error creating community member:", response);
      }
    } catch (error) {
      console.error("Error creating community member:", error);
    } finally {
      setIsCreatingCommunityMember(false);
    }
  }

  // Get communities not in userCommunities and add memberCount and categoryCount
  const joinableCommunities = communitiesRef.current?.filter((community: any) => 
    !communities.some((userCommunity: any) => userCommunity.community.id === community.id)
  ).map((community: any) => ({
    ...community,
    memberCount: membersRef.current?.filter((member: any) => 
      member.community_id === community.id && 
      member.status === 'ACCEPTED'
    ).length || 0,
    categoryCount: categoriesRef.current?.filter((category: any) => 
      category.community_id === community.id
    ).length || 0
  }));

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedCategories.current || !hasFetchedMembers.current || isCreatingCommunityMember || isRefetching;
  if (debugExplorePage && !loading) {
    const joinableDetails = joinableCommunities?.map((community: any) => 
      `  ID: ${community.id}, Name: ${community.name}, Members: ${community.memberCount}, Categories: ${community.categoryCount}`
    ).join('\n') || '';
    console.log(`📱 Rendering ExplorePage - Joinable Communities: ${joinableCommunities?.length || 0}, User Communities: ${communities?.length || 0}\n${joinableDetails}`);
  }

  return (
    <ExploreScreen 
      loading={loading}
      communities={joinableCommunities || []}
      categoryList={categoriesRef.current || []}
      memberList={membersRef.current || []}
      handleJoinCommunity={handleCreateCommunityMember}
    />
  );
}

export default AuthWrapper(ExplorePage);