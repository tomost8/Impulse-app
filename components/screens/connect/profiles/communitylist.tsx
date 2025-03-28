import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';

const CommunityList = () => {
  // Hardcoded communities data
  const communities = [
    { id: 1, name: 'Supercharged', image: require('@/assets/images/andrew.png') },
    { id: 2, name: 'Supercharged', image: require('@/assets/images/andrew.png') },
    { id: 3, name: 'Supercharged', image: require('@/assets/images/andrew.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image 
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Communities</Text>
      </View>

      {/* Communities List */}
      <ScrollView style={styles.scrollContainer}>
        {communities.map((community) => (
          <View key={community.id} style={styles.communityItem}>
            <View style={styles.communityInfo}>
              <Image 
                source={community.image}
                style={styles.communityImage}
              />
              <Text style={styles.communityName}>{community.name}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  communityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  communityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  communityImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  communityName: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  viewButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default CommunityList;
