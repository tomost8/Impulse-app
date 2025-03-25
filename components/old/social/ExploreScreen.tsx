import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import styles from '@/utils/testStyles';
import { Searchbar } from 'react-native-paper';
import { goals } from '@/utils/goals'; // Import goals from goals.ts
import { RadioButton } from 'react-native-paper';

export const ExploreScreenOld = ({ 
    userRef, 
    searchQuery, 
    setSearchQuery, 
    selectedGoal, 
    setSelectedGoal, 
    filteredCommunities,
    handleCreateCommunityMember 
  }: {
    userRef: React.MutableRefObject<any>,
    searchQuery: string,
    setSearchQuery: (query: string) => void,
    selectedGoal: string | null,
    setSelectedGoal: (goal: string) => void,
    filteredCommunities: any[] | undefined,
    handleCreateCommunityMember: (communityId: number) => Promise<void>
  }) => {
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
  };