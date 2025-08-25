import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Platform, StatusBar} from 'react-native';
import { 
  Header, 
  SearchBar, 
  CategoriesBar,
  CommunityCard 
} from '@/components/ui/SocialPage/Explore';
import { getLabelByCategory } from '@/utils/goals';

interface ExploreScreenProps {
  loading: boolean;
  communities: any[];
  categoryList: any[];
  memberList: any[];
  handleJoinCommunity: (communityId: number) => void;
}

const ExploreScreen = ({ 
  loading, communities, categoryList, memberList, handleJoinCommunity 
}: ExploreScreenProps) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Filtering
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Filter by both selectedGoal and search query
  const filteredCommunities = communities?.filter((community: any) => {
    const matchesCategory = selectedCategory === null || categoryList?.some((category: any) => 
      category.community_id === community.id && getLabelByCategory(category.category) === selectedCategory
    );
    const matchesSearch = searchQuery === '' || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <SearchBar onSearch={handleSearch} />
          <CategoriesBar
            selectedCategory={selectedCategory || ''}
            onSelectCategory={handleCategorySelect}
          />
          <View style={styles.feedContainer}>
            <View style={styles.cardGrid}>
              {filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  image={community.thumbnail}
                  memberCount={community.memberCount}
                  onJoin={() => handleJoinCommunity(Number(community.id))}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  feedContainer: {
    width: 350,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
});

export default ExploreScreen;
