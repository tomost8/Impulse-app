import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetCommunities, useGetUserCommunities, useGetAllCategories } from '../../../hooks/graphql/communities/queries';
import { useCreateCommunityMember } from '@/hooks/graphql/communities/mutations';
import { useGetUser } from '@/hooks/graphql/users/queries';
// Components
// Debug
import { debugRenders } from '@/constants/debug';
import { Searchbar } from 'react-native-paper';
import { goals } from '@/constants/goals'; // Import goals from goals.ts
import { RadioButton } from 'react-native-paper';


const ExplorePage = (props: any) => {
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const communitiesRef = useRef<any[] | null>(null);
  const hasFetchedCommunities = useRef(false);
  const { communities, fetched: hasNewCommunitiesData } = useGetCommunities(!hasFetchedCommunities.current);

  const userCommunitiesRef = useRef<any[] | null>(null);
  const hasFetchedUserCommunities = useRef(false);
  const { communityMembers, fetched: hasNewUserCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedUserCommunities.current);

  const categoriesRef = useRef<any[] | null>(null);
  const hasFetchedCategories = useRef(false);
  const { categories, fetched: hasNewCategoriesData } = useGetAllCategories(!hasFetchedCategories.current);

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewUserCommunitiesData && !hasNewCategoriesData && !hasNewUserData) {
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
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedUserCommunities.current && hasFetchedCategories.current && hasFetchedUser.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData, hasNewUserCommunitiesData, hasNewCategoriesData, hasNewUserData]);

  // Mutations
  const { createCommunityMember } = useCreateCommunityMember();
  const [isCreatingCommunityMember, setIsCreatingCommunityMember] = useState(false);
  const handleCreateCommunityMember = async (communityId: number) => {
    setIsCreatingCommunityMember(true);
    try {
      const input = {
        community_id: communityId,
        user_id: userId
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // Get communities not in userCommunities and filter by selectedGoal
  const filteredCommunities = communitiesRef.current?.filter((community: any) => 
    !userCommunitiesRef.current?.some((userCommunity: any) => userCommunity.community.id === community.id) &&
    (selectedGoal === null || categoriesRef.current?.some((category: any) => 
      category.community_id === community.id && category.category === selectedGoal
    ))
  );

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedUserCommunities.current || !hasFetchedUser.current || !hasFetchedCategories.current;
  if (debugRenders && !loading) {
    console.log("Rendering ExplorePage\n",
      "Communities:", communitiesRef.current, "\n",
      "Selected Goal:", selectedGoal, "\n",
      "Filtered Communities:", filteredCommunities, "\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  return (
    <View>
      { userRef.current?.role === "INFLUENCER" && (
        <TouchableOpacity style={styles.button} onPress={() => router.push('/social/createCommunity')}>
          <Text style={styles.text}>Create Community</Text>
        </TouchableOpacity>
      )}
      <View style={styles.section}>
        <Searchbar
          placeholder="Search for groups..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Filter Communities by Category</Text>
        <RadioButton.Group onValueChange={setSelectedGoal} value={selectedGoal || ''}>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.checkbox}>
              <Text style={styles.text}>{goal.label}</Text>
              <RadioButton value={goal.category} />
            </View>
          ))}
        </RadioButton.Group>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.text}>Communities List (Filtered)</Text>
        {(
          filteredCommunities
            ?.filter((community: any) => community.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((community: any) => (
              <View key={community.id}>
                <Text style={styles.text}>{community.name}</Text>
                <Text style={styles.text}>Number of Members (need to retrieve from backend)</Text>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => router.push(`/community/${community.id}`)}
                >
                  <Text style={styles.text}>Group View</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => handleCreateCommunityMember(community.id)}
                >
                  <Text style={styles.text}>Join Group</Text>
                </TouchableOpacity>
              </View>
            ))
        )}
      </View>
    </View>
  );
}

export default AuthWrapper(ExplorePage);