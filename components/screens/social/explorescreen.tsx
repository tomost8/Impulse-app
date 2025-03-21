import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { 
  Header, 
  SearchBar, 
  CategoriesBar,
  CommunityCard 
} from '@/components/ui/SocialPage/Explore';

interface ExploreScreenProps {
  loading: boolean;
  communities: any[];
  selectedCategory: string;
  handleCategorySelect: (category: string) => void;
  handleJoinCommunity: (communityId: number) => void;
}

const ExploreScreen = ({ loading, communities, selectedCategory, handleCategorySelect, handleJoinCommunity }: ExploreScreenProps) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }
  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  //const [searchQuery, setSearchQuery] = useState('');
  //console.log('ExploreScreen Communities:', communities, filteredCommunities);

  const handleSearch = (text: string) => {
    const filtered = communities.filter(community => 
      text === '' || community.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCommunities(filtered);
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
              {filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  image={community.thumbnail}
                  memberCount={25} // TODO: fetch this
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
