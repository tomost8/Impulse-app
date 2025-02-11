import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Modal, Portal, Checkbox } from 'react-native-paper';
import styles from '@/constants/testStyles';

import { useState, useContext } from 'react';
import { SocialDataContext } from '@/app/(tabs)/camera/_layout';
import { debugRenders } from '@/constants/debug';
import { useCreatePost } from '@/hooks/graphql/posts/mutations';

interface SendPhotoModalProps {
    visible: boolean;
    hideModal: () => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    setSelectedCategory: (category: string) => void;
    activities: any[];
}

const SendPhotoModal = ({ visible, hideModal, currentTab, setCurrentTab, setSelectedCategory, activities }: SendPhotoModalProps) => {
    const socialData = useContext(SocialDataContext);
    const userId = socialData?.userId;
    const authToken = socialData?.authToken;
    const friends = socialData?.friends ?? [];
    const groups = socialData?.groups ?? [];
    const communities = socialData?.communities ?? [];

    const [activityID, setActivityID] = useState<string>("");
    const [activityCategory, setActivityCategory] = useState<string>("");
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
            const input = {
                authorId: userId,
                activityId: activityID,
                category: activityCategory,
                caption: caption,
                post_targets: postTargets,
                mediaUrl: "https://www.google.com",
                //expires_at: new Date(),
            }
            console.log("input", input);
            const response = await createPost(input, authToken as string);
            console.log("response", response);
            if (response.success) {
                console.log("Post created successfully:", response.post);
            } else {
                console.error("Oh no! Error creating post:", response.errors);
            }
            
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsCreatingPost(false);
        }
    }

    // Debug
    if (debugRenders) {
      console.log("Rendering SendPhotoModal\n",
        "Friends:", friends, "\n",
        "Groups:", groups, "\n",
        "Communities:", communities, "\n",
      );
    }

    return (
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} style={styles.container}>
          {currentTab === "activity" && (
            <View style={styles.modal}>
              <Text style={styles.text}>Send Photo Modal - Activity</Text>
              {activities.filter(activity => activity.status === "pending").map((activity: any) => (
                <View key={activity.id} style={styles.checkbox}>
                  <Checkbox
                    status={activityID === activity.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setActivityID(activity.id);
                      setSelectedCategory(activity.category); //this is for header
                      setActivityCategory(activity.category); //this is for mutation input
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
              {friends?.map((friend: any) => (
                <View key={friend.friend.id} style={styles.checkbox}>
                  <Checkbox
                    status={selectedTargets["friend" + friend.friend.id] ? 'checked' : 'unchecked'}
                    onPress={() => toggleTarget("friend" + friend.friend.id)}
                  />
                  <Text style={styles.text}>{friend.friend.username}</Text>
                </View>
              ))}
              {groups?.map((group: any) => (
                <View key={group.chat.id} style={styles.checkbox}> 
                  <Checkbox 
                    status={selectedTargets["group" + group.chat.id] ? 'checked' : 'unchecked'}
                    onPress={() => toggleTarget("group" + group.chat.id)}
                  />
                  <Text style={styles.text}>{group.chat.title}</Text>
                </View>
              ))}
              {communities?.map((community: any) => (
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