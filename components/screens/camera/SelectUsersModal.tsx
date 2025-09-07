import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

interface UserOptionProps {
  name: string;
  profilePic: any;
  isSelected: boolean;
  onSelect: () => void;
}

const UserOption = ({ name, profilePic, isSelected, onSelect }: UserOptionProps) => (
  <TouchableOpacity 
    style={styles.optionContainer}
    onPress={onSelect}
  >
    <View style={styles.optionContent}>
      <Image source={{uri: profilePic}} style={styles.profilePic} />
      <Text style={styles.optionName}>{name}</Text>
    </View>
    <Image 
      source={isSelected ? 
        require("@/assets/icons/greencheck.png") : 
        require("@/assets/icons/circleunfilled.png")
      }
      style={styles.checkIcon}
    />
  </TouchableOpacity>
);

interface SelectUsersProps {
  isVisible: boolean;
  onClose: () => void;
  onSend: () => void;
  acceptedFriends: any[];
  acceptedGroups: any[];
  acceptedCommunities: any[];
  loading: boolean;
  selectedPostTargets: string[];
  togglePostTarget: (optionId: string) => void;
  userId: string;
}

const SelectUsers = ({ 
  isVisible, 
  onClose, 
  onSend, 
  loading,
  selectedPostTargets,
  togglePostTarget,
  acceptedFriends,
  acceptedGroups,
  acceptedCommunities,
  userId 
}: SelectUsersProps) => {
  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  const handleSend = () => {
    onSend();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Fixed Post to Friend Feed Option */}
          <TouchableOpacity 
            style={styles.friendFeedOption}
            onPress={() => togglePostTarget(`feed${userId}`)}
          >
            <View style={styles.optionContent}>
              <View style={styles.addPostIconContainer}>
                <Image 
                  source={require("@/assets/icons/addPost.png")}
                  style={styles.addPostIcon}
                />
              </View>
              <Text style={styles.optionName}>Post to Friend Feed</Text>
            </View>
            <Image 
              source={selectedPostTargets.includes(`feed${userId}`) ? 
                require("@/assets/icons/greencheck.png") : 
                require("@/assets/icons/circleunfilled.png")
              }
              style={styles.checkIcon}
            />
          </TouchableOpacity>

          {/* Scrollable Options */}
          <ScrollView style={styles.scrollContainer}>
            {acceptedFriends?.map((friend: any) => (
              <UserOption
                key={friend.friend.id}
                name={friend.friend.username}
                profilePic={friend.friend.profile_picture}
                isSelected={selectedPostTargets.includes(`friend${friend.friend.id}`)}
                onSelect={() => togglePostTarget(`friend${friend.friend.id}`)}
              />
            ))}
            {acceptedGroups?.map((group: any) => (
              <UserOption
                key={group.chat.id}
                name={group.chat.title}
                profilePic={group.chat.profile_pic}
                isSelected={selectedPostTargets.includes(`group${group.chat.id}`)}
                onSelect={() => togglePostTarget(`group${group.chat.id}`)}
              />
            ))}
            {acceptedCommunities?.map((community: any) => (
              <UserOption
                key={community.community.id}
                name={community.community.name}
                profilePic={community.community.thumbnail}
                isSelected={selectedPostTargets.includes(`community${community.community.id}`)}
                onSelect={() => togglePostTarget(`community${community.community.id}`)}
              />
            ))}
          </ScrollView>

          {/* Bottom Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onClose}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSend}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    height: '80%',
  },
  friendFeedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  addPostIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPostIcon: {
    width: 40,
    height: 40,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 20,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  optionName: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#242020',
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 34,
    gap: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#DE728D',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#DE728D',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#DE728D',
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default SelectUsers;
