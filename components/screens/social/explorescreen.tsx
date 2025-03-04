import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from '@/components/ui/SocialPage/Explore/header';
import SearchBar from '@/components/ui/SocialPage/Explore/searchbar';

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Handle search logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ExploreScreen;
