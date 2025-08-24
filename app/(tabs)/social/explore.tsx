import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL hooks
import { useGetCommunities, useGetUserCommunities, useGetAllCategories, useGetAllCommunityMembers } from '@/hooks/graphql/communities/queries';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';
// Components
import ExploreScreen from '@/components/screens/social/main/explorescreen';
// Debug
import { debugRenders } from '@/debug/utils';
// Services
import { useDataProvider } from '@/contexts/DataProviderContext';
import { getLabelByCategory } from '@/utils/goals';


const ExplorePage = () => {
  const { fetching, user } = useDataProvider();
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

  const membersRef = useRef<any[] | null>(null);
  const hasFetchedMembers = useRef(false);
  const { communityMembers: allCommunityMembers, fetched: hasNewMembersData } = useGetAllCommunityMembers(!hasFetchedMembers.current);

  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewUserCommunitiesData && !hasNewCategoriesData && !hasNewMembersData) {
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
    if (hasNewMembersData) {
      membersRef.current = allCommunityMembers;
      hasFetchedMembers.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedUserCommunities.current && hasFetchedCategories.current && hasFetchedMembers.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData, hasNewUserCommunitiesData, hasNewCategoriesData, hasNewMembersData]);

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
  // Get communities not in userCommunities and add memberCount
  const joinableCommunities = communitiesRef.current?.filter((community: any) => 
    !userCommunitiesRef.current?.some((userCommunity: any) => userCommunity.community.id === community.id)
  ).map((community: any) => ({
    ...community,
    memberCount: membersRef.current?.filter((member: any) => 
      member.community_id === community.id && 
      member.status === 'ACCEPTED'
    ).length || 0
  }));

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedUserCommunities.current || !hasFetchedCategories.current || !hasFetchedMembers.current || isCreatingCommunityMember;
  if (debugRenders && !loading) {
    console.log("Rendering ExplorePage\n",
      "Communities:", communitiesRef.current, "\n",
      "Categories:", categoriesRef.current, "\n",
      "Members:", membersRef.current, "\n",
      "Joinable Communities:", joinableCommunities, "\n",
      "User:", user, "\n",
      "Render Counter:", renderCounter, "\n",
    );
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