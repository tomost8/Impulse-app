import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { s } from "react-native-size-matters";
import { router } from "expo-router";
import Header from "@/components/ui/common/headers/Header";
import LeaveCommunityPopup from './CommunityLeaveModal';



interface CommunityProps {
  loading: boolean;
  communities: any[];
  handleLeaveCommunity: (id: number) => void;
}

const CommunitiesList = (props: CommunityProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }

  const [searchText, setSearchText] = useState("");
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);

  // Filter communities based on search text
  const filteredCommunities = props.communities.filter(community => 
    community.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleLeaveCommunity = (id: number) => {
    setSelectedCommunityId(id);
    setShowLeavePopup(true);
  };

  const confirmLeaveCommunity = () => {
    if (selectedCommunityId) {
      props.handleLeaveCommunity(selectedCommunityId);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Communities"
        onBackPress={() => router.back()}
      />
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Image
            source={require("@/assets/icons/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities"
            placeholderTextColor="#979797"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <ScrollView style={styles.communitiesList}>
          {filteredCommunities.map((community) => (
            <View key={community.id} style={styles.communityItem}>
              <TouchableOpacity onPress={() => router.push(`/community/${community.id}`)}>
                <Image
                  source={{uri: community.thumbnail}}
                  style={styles.communityAvatar}
                />
              </TouchableOpacity>
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.name}</Text>
                <TouchableOpacity
                  style={[styles.leaveButton, community.role === 'ADMIN' && styles.leaveButtonDisabled]}
                  onPress={() => community.role !== 'ADMIN' && handleLeaveCommunity(community.id)}
                  disabled={community.role === 'ADMIN'}
                >
                  <Text style={[styles.leaveButtonText, community.role === 'ADMIN' && styles.leaveButtonTextDisabled]}>Leave</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <LeaveCommunityPopup 
        visible={showLeavePopup}
        onClose={() => setShowLeavePopup(false)}
        onLeave={confirmLeaveCommunity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBackground: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: s(8),
  },
  backIcon: {
    width: 10,
    height: 15,
    tintColor: '#242020',
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    color: '#242020',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(20),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: s(100),
    paddingHorizontal: s(16),
    height: s(48),
    marginBottom: s(12),
  },
  searchIcon: {
    width: s(18),
    height: s(18),
    marginRight: s(12),
  },
  searchInput: {
    flex: 1,
    fontSize: s(14),
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  communitiesList: {
    flex: 1,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(12),
  },
  communityAvatar: {
    width: s(50),
    height: s(50),
    borderRadius: s(25),
    marginRight: s(12),
  },
  communityInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  communityName: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
  },
  leaveButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: s(15),
    paddingVertical: s(8),
    borderRadius: s(100),
  },
  leaveButtonDisabled: {
    backgroundColor: '#E1E1E1',
  },
  leaveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '700',
  },
  leaveButtonTextDisabled: {
    color: '#979797',
  },
});

export default CommunitiesList;
