import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import styles from '@/constants/testStyles';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetCommunities, useGetUserCommunities, useGetCategoryCommunities } from '../../../hooks/graphql/communities/queries';
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

  const userRef = useRef<any | null>(null);
  const hasFetchedUser = useRef(false);
  const { user, fetched: hasNewUserData } = useGetUser(userId as number, !hasFetchedUser.current);

  const communityCategoriesRef = useRef<any[] | null>(null); // Need to figure out category filtering
  const hasFetchedCategoryCommunities = useRef(false);
  const { communityCategories, fetched: hasNewCategoryCommunitiesData } = useGetCategoryCommunities("PASSION_HOBBY", false);


  useEffect(() => {
    if (!hasNewCommunitiesData && !hasNewUserCommunitiesData && !hasNewUserData) {
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
    if (hasNewUserData) {
      userRef.current = user;
      hasFetchedUser.current = true;
    }
    if (hasFetchedCommunities.current && hasFetchedUserCommunities.current && hasFetchedUser.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewCommunitiesData]);

  // Search + Filtering, need to add functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // Get communities not in userCommunities
  const joinableCommunities = communitiesRef.current?.filter((community: any) => 
    !userCommunitiesRef.current?.some((userCommunity: any) => userCommunity.community.id === community.id)
  );

  // Debug
  const loading = !hasFetchedCommunities.current || !hasFetchedUserCommunities.current || !hasFetchedUser.current;
  if (debugRenders && !loading) {
    console.log("Rendering ExplorePage\n",
      "Communities:", communitiesRef.current, "\n",
      "User Communities:", userCommunitiesRef.current, "\n",
      "User:", userRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
      "Joinable Communities:", joinableCommunities, "\n",
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
        <RadioButton.Group onValueChange={value => setSelectedGoal(value)} value={selectedGoal || ''}>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.checkbox}>
              <Text style={styles.text}>{goal.label}</Text>
              <RadioButton value={goal.category} />
            </View>
          ))}
        </RadioButton.Group>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.text}>Communities Not in User Communities</Text>
        {(
          joinableCommunities
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
                  onPress={() => console.log("Join Group")}
                >
                  <Text style={styles.text}>Join Group</Text>
                </TouchableOpacity>
              </View>
            ))
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>All Communities (Testing)</Text>
        {(
          communitiesRef.current
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
                  onPress={() => console.log("Join Group")}
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