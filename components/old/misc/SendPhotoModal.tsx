import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Modal, Portal, Checkbox } from 'react-native-paper';
import styles from '@/utils/testStyles';

import { useState, useContext } from 'react';
import { CameraHeaderContext } from '@/app/(tabs)/camera/_layout';
import { debugRenders } from '@/utils/debug';
import { useCreatePost } from '@/hooks/graphql/posts/mutations';
import { processAndUploadImage } from '@/utils/imageProcessing';
// Services
import { useUserData } from '@/services/UserPreferencesContext';
import { useUserInfo } from '@/services/UserContext';

interface SendPhotoModalProps {
  visible: boolean;
  hideModal: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activitiesList: any[];
  imageSources: string[];
}

const SendPhotoModal = ({ visible, hideModal, currentTab, setCurrentTab, activitiesList, imageSources }: SendPhotoModalProps) => {

  const { userId, authToken } = useUserInfo();
  const { fetching, user, friends, chats, communities } = useUserData();
  const acceptedFriends = friends?.filter((friend: any) => friend.status === "ACCEPTED");
  const acceptedGroups = chats?.filter((chat: any) => chat.status === "ACCEPTED" && chat.chat.type === "group");
  const acceptedCommunities = communities?.filter((community: any) => community.status === "ACCEPTED");

  const cameraHeader = useContext(CameraHeaderContext);
  const id = cameraHeader?.id;
  const category = cameraHeader?.category;

  //console.log("id", id, "category", category);
  console.log("imageSources", imageSources);

  const [caption, setCaption] = useState<string>("");
  const [selectedTargets, setSelectedTargets] = useState<{[key: string]: boolean}>({});

  const toggleTarget = (id: string) => {
    setSelectedTargets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mutations
  const { createPost } = useCreatePost();
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = async () => {
    setIsCreatingPost(true);
    try {
      const postTargets = Object.entries(selectedTargets).map(([key, value]) => {
        const [targetType, targetId] = key.split(/(\d+)/).filter(Boolean);
        return {
          target_type: targetType,
          target_id: parseInt(targetId, 10),
        };
      });
      const downloadURLs = await Promise.all(imageSources.map(processAndUploadImage));
      const input = {
        authorId: userId,
        activityId: id,
        category: category,
        caption: caption,
        post_targets: postTargets,
        mediaUrls: downloadURLs,
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
      };
      console.log("input", input);
      const response = await createPost(input, authToken as string);
      if (response.success) {
        console.log("Post created successfully:", response.post);
      } else {
        throw new Error("createPost response.success false:" + response.errors);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  // Debug
  if (debugRenders) {
    console.log("Rendering SendPhotoModal\n",
      "Accepted Friends:", acceptedFriends, "\n",
      "Accepted Groups:", acceptedGroups, "\n",
      "Accepted Communities:", acceptedCommunities, "\n",
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} style={styles.container}>
        {currentTab === "activity" && (
          <View style={styles.modal}>
            <Text style={styles.text}>Send Photo Modal - Activity</Text>
            {activitiesList.filter((activity: any) => activity.status === "pending").map((activity: any) => (
              <View key={activity.id} style={styles.checkbox}>
                <Checkbox
                  status={id === activity.id ? 'checked' : 'unchecked'}
                  onPress={() => {
                    cameraHeader?.setId(activity.id);
                    cameraHeader?.setCategory(activity.category);
                  }}
                />
                <Text style={styles.text}>{activity.category}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => { 
              hideModal(); 
              setCurrentTab("closed");
            }}>
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentTab === "caption" && (
          <View style={styles.modal}>
            <Text style={styles.text}>Send Photo Modal - Caption</Text>
            <TextInput
              style={styles.input}
              placeholder="Add Caption (Optional)"
              placeholderTextColor={"white"}
              value={caption}
              onChangeText={setCaption}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
              hideModal();
              setCaption("");
            }}>
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentTab("users")}>
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentTab === "users" && (
          <View style={styles.modal}>
            <Text style={styles.text}>Send Photo Modal - Users</Text>
            <View style={styles.checkbox}>
              <Checkbox
                status={selectedTargets["feed" + userId] ? 'checked' : 'unchecked'}
                onPress={() => toggleTarget("feed" + userId)}
              />
              <Text style={styles.text}>Post to Feed</Text>
            </View>
            {acceptedFriends?.map((friend: any) => (
              <View key={friend.friend.id} style={styles.checkbox}>
                <Checkbox
                  status={selectedTargets["friend" + friend.friend.id] ? 'checked' : 'unchecked'}
                  onPress={() => toggleTarget("friend" + friend.friend.id)}
                />
                <Text style={styles.text}>{friend.friend.username}</Text>
              </View>
            ))}
            {acceptedGroups?.map((group: any) => (
              <View key={group.chat.id} style={styles.checkbox}> 
                <Checkbox 
                  status={selectedTargets["group" + group.chat.id] ? 'checked' : 'unchecked'}
                  onPress={() => toggleTarget("group" + group.chat.id)}
                />
                <Text style={styles.text}>{group.chat.title}</Text>
              </View>
            ))}
            {acceptedCommunities?.map((community: any) => (
              <View key={community.community.id} style={styles.checkbox}>
                <Checkbox
                  status={selectedTargets["community" + community.community.id] ? 'checked' : 'unchecked'}
                  onPress={() => toggleTarget("community" + community.community.id)}
                />
                <Text style={styles.text}>{community.community.name}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => {
              setCaption("");
              setCurrentTab("caption");
            }}>
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              handleCreatePost();
              hideModal();
            }}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentTab !== "activity" && currentTab !== "caption" && currentTab !== "users" && (
          <View style={styles.modal}>
            <Text style={styles.text}>The modal should be closed!</Text>
            <TouchableOpacity style={styles.button} onPress={hideModal}>
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

export default SendPhotoModal;