import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import LoadingScreen from '@/components/ui/common/loading';
import { router } from 'expo-router';
import Header from "@/components/ui/common/headers/Header";

interface CommunityListProps {
  loading: boolean;
  communities: any[];
}

const CommunityList = (props: CommunityListProps) => {
  if (props.loading) {
    return <LoadingScreen />;
  }

  const handleViewCommunity = (communityId: number) => {
    router.push(`/community/${communityId}`);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Communities"
        onBackPress={() => router.back()}
      />
      <ScrollView style={styles.scrollView}>

        {/* Communities List */}
        {props.communities.map((community) => (
          <View key={community.id} style={styles.communityItem}>
            <View style={styles.communityInfo}>
              <Image 
                source={{ uri: community.thumbnail }}
                style={styles.communityImage}
              />
              <Text style={styles.communityName}>{community.name}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={() => handleViewCommunity(community.id)}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerExtension: {
    backgroundColor: '#E0EDFD',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 18,
  },
  backButton: {
    width: 11,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 8,
  },
  backIcon: {
    width: 11,
    height: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  scrollView: {
    flex: 1,
  },
  communityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 16, 
  },
  communityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 100,
    marginRight: 2, 
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default CommunityList;
