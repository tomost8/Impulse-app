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
import JoinSuccessPopup from './joinsuccesspopup';
import PasswordPopup from './passwordpopup';

interface Group {
  id: string;
  title: string;
  profile_pic: any;
  password?: string;
}

interface JoinGroupScreenProps {
  loading: boolean;
  groups: Group[];
}

const JoinGroupScreen = (props: JoinGroupScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }
  console.log("Joinable Groups:", props.groups);

  // Search Bar
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    const filteredGroups = props.groups.filter(group => 
      group.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredGroups;
  };

  // Password Popup
  const [isPasswordPopupVisible, setIsPasswordPopupVisible] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  const handleJoin = (id: string, hasPassword: boolean) => {
    if (hasPassword) {
      setIsPasswordPopupVisible(true);
    } else {
      // Handle join with password logic
      console.log("Joining group (no password):", id);
    }
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupVisible(false);
  };

  const handlePasswordSubmit = (password: string) => {
    console.log('Password submitted:', password);
    setIsPasswordPopupVisible(false);
    // Handle join with password logic
  };

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
        <Text style={styles.title}>Joining a Group</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image 
          source={require("@/assets/icons/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search groups"
          placeholderTextColor="#979797"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Groups List */}
      <ScrollView style={styles.groupsList}>
        {handleSearch().map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupInfo}>
              <Image 
                source={group.profile_pic}
                style={styles.profileImage}
              />
              <Text style={styles.groupName}>{group.title}</Text>
            </View>
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={() => handleJoin(group.id, group.password ? true : false)}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Success Popup */}
      <JoinSuccessPopup 
        isVisible={isSuccessPopupVisible}
        onClose={handleCloseSuccessPopup}
      />

      <PasswordPopup
        isVisible={isPasswordPopupVisible}
        onClose={() => setIsPasswordPopupVisible(false)}
        onSubmit={handlePasswordSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    marginLeft: 6,
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
  groupsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  groupName: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  joinButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#DE728D',
    borderRadius: 100,
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default JoinGroupScreen;
