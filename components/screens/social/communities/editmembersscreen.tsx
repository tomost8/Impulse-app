import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import RemoveUserPopup from './removeuserpopup';

interface Member {
  id: string;
  name: string;
  username: string;
  profileImage: any;
}

const EditMembersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRemovePopupVisible, setIsRemovePopupVisible] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Sample member data
  const members: Member[] = [
    { id: '1', name: 'Courtney', username: 'username', profileImage: require('@/assets/images/andrew.png') },
    { id: '2', name: 'Courtney', username: 'username', profileImage: require('@/assets/images/andrew.png') },
    { id: '3', name: 'Courtney', username: 'username', profileImage: require('@/assets/images/andrew.png') },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    setIsRemovePopupVisible(true);
  };

  const handleRemoveConfirm = () => {
    if (selectedMemberId) {
      console.log('Removing member:', selectedMemberId);
      // Add actual remove logic here
    }
    setIsRemovePopupVisible(false);
    setSelectedMemberId(null);
  };

  const handleRemoveCancel = () => {
    setIsRemovePopupVisible(false);
    setSelectedMemberId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Image 
            source={require("@/assets/icons/backArrow.png")}
            style={styles.backIcon}
          />
          <Text style={styles.pageTitle}>Members</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image 
          source={require("@/assets/icons/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search username"
          placeholderTextColor="#979797"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Members List */}
      <ScrollView style={styles.membersList}>
        {members.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberInfo}>
              <Image 
                source={member.profileImage}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{member.name}</Text>
                <Text style={styles.username}>{member.username}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveMember(member.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add RemoveUserPopup */}
      <RemoveUserPopup 
        isVisible={isRemovePopupVisible}
        onClose={handleRemoveCancel}
        onRemove={handleRemoveConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  pageTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    paddingLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 100,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#979797',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  membersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  removeText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#DE728D',
    fontWeight: '600',
  },
});

export default EditMembersScreen;
