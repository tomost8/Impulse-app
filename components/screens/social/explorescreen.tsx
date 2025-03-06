import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { 
  Header, 
  SearchBar, 
  CategoriesBar,
  CommunityCard 
} from '@/components/ui/SocialPage/Explore';

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Sample data - replace with real data later
  const sampleCommunities = Array(6).fill({
    name: "Hiking Adventures",
    memberCount: 25,
  });

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Handle search logic here
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    // Handle category filter logic here
  };

  const handleJoinCommunity = (communityId: string) => {
    console.log('Join community pressed:', communityId);
    // Handle join logic here
  };

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
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          <View style={styles.feedContainer}>
            <View style={styles.cardGrid}>
              {sampleCommunities.map((community, index) => (
                <CommunityCard
                  key={index}
                  name={community.name}
                  memberCount={community.memberCount}
                  onJoin={() => handleJoinCommunity(index.toString())}
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
