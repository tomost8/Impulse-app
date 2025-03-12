import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface HeaderProps {
  name: string;
  memberCount: number;
  profileImage?: string;
  communityId: string;
}

const Header: React.FC<HeaderProps> = ({
  name = "Community Name",
  memberCount = 25,
  profileImage,
  communityId
}) => {
  const handleEdit = () => {
    router.push(`/(tabs)/social/communities/${communityId}/editMembers`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={profileImage ? { uri: profileImage } : require("@/assets/images/communityprofile.png")}
        style={styles.coverImage}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{name}</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Image 
              source={require("@/assets/icons/edit.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.memberCount}>{memberCount} members</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: 109,
    alignSelf: 'stretch',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  editIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
  memberCount: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#979797',
  },
});

export default Header;
