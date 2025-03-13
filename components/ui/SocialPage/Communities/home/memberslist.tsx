import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Member {
  id: string;
  name: string;
  username: string;
  profile_picture?: string;
}

interface MemberListProps {
  members?: Member[];
}

const MembersList: React.FC<MemberListProps> = ({
  members = [],
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members</Text>
      
      <View style={styles.membersList}>
        {members.map((member, index) => (
          <View key={member.id + index} style={styles.memberCard}>
            <View style={styles.memberInfo}>
              <Image
                source={member.profile_picture ? { uri: member.profile_picture } : require("@/assets/images/andrew.png")}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{member.name}</Text>
                <Text style={styles.username}>{member.username}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.viewProfileButton}
              onPress={() => console.log("View Profile", member.id)}
            >
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    paddingLeft: 6,
  },
  membersList: {
    gap: 6,
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
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
  viewProfileButton: {
    backgroundColor: '#DE728D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  viewProfileText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MembersList;
