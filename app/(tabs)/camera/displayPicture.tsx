import styles from "@/utils/testStyles";
import { View, Image, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef, useContext } from 'react';
import { CameraHeaderContext } from './_layout';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { debugRenders, pageDisplay } from '@/utils/debug';
import { useUserData } from "@/services/UserPreferencesContext";
// Components
import PictureTaken from "@/components/screens/camera/SingleLensCamera/pictureTaken";
import AddCaption from "@/components/screens/camera/SingleLensCamera/addCaption";
import SelectUsers from "@/components/screens/camera/SharedPages/selectUsers";
import SelectGoal from "@/components/screens/camera/SharedPages/selectGoal";

const DisplayPicturePage = () => {
  const context = useContext(CameraHeaderContext);
  if (!context) return null;
  const { id, category, frontPhoto, backPhoto } = useLocalSearchParams();

  const frontImageSource = frontPhoto ? { uri: frontPhoto as string } : null;
  const backImageSource = backPhoto ? { uri: backPhoto as string } : null;

  // Get the main image (prefer front, fallback to back)
  const mainImageSource = frontImageSource || backImageSource;
  const previewImageSource = frontImageSource && backImageSource ? backImageSource : null;

  // Convert image sources to array of URI strings
  const imageSources: string[] = [frontImageSource, backImageSource]
    .filter(Boolean)
    .map(source => source!.uri);

  // User Data
  const { fetching, user, activities, friends, chats, communities } = useUserData();
  const timezone = user?.timezone;
  const acceptedFriends = friends?.filter((friend: any) => friend.status === "ACCEPTED");
  const acceptedGroups = chats?.filter((chat: any) => chat.status === "ACCEPTED" && chat.chat.type === "group");
  const acceptedCommunities = communities?.filter((community: any) => community.status === "ACCEPTED");

  useEffect(() => {
    context.setPictureTaken(true);
    context.setCategory(category as string);
  }, [category]);

  // Mutations
  /*
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
  */

  // Debug
  if (debugRenders) {
    console.log("Rendering SendPhotoModal\n",
      "Accepted Friends:", acceptedFriends, "\n",
      "Accepted Groups:", acceptedGroups, "\n",
      "Accepted Communities:", acceptedCommunities, "\n",
    );
  }

  // Modals
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [captionFooterVisible, setCaptionFooterVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  // Add new state for caption and keyboard visibility
  const [caption, setCaption] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (id && category) {
      setActivityModalVisible(false);
      setCaptionFooterVisible(true);
      setUsersModalVisible(false);
    } else {
      setActivityModalVisible(false);
      setCaptionFooterVisible(false);
      setUsersModalVisible(false);
    }
  }, [id, category]);

  const handleActivityNext = () => {
    console.log("Next Activity Button Pressed");
    setActivityModalVisible(false);
    setCaptionFooterVisible(true);
  };

  // Debug
  const loading = fetching;
  if (debugRenders && !loading) {
    console.log("Rendering DisplayPicturePage\n",
      "Activities:", activities, "\n",
      "Friends:", acceptedFriends, "\n",
      "Chats:", acceptedGroups, "\n",
      "Communities:", acceptedCommunities, "\n",
      "Front Image Source:", frontImageSource, "\n",
      "Back Image Source:", backImageSource, "\n",
    );
  }

  /*
  if (pageDisplay) {
    return <PictureTaken />;
  }
  */

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        {/* Main large image */}
        {mainImageSource && (
          <Image 
            source={mainImageSource} 
            style={styles.mainImage} 
          />
        )}
        {/* Only show preview if we have a preview image */}
        {previewImageSource && (
          <View style={styles.previewContainer}>
            <Image 
              source={previewImageSource} 
              style={styles.previewImage} 
            />
          </View>
        )}
      </View>

      {captionFooterVisible && (
        <View style={styles.captionContainer}>
          <TextInput
            style={[
              styles.captionInput,
              isKeyboardVisible && styles.captionInputExpanded
            ]}
            placeholder="Add caption...."
            placeholderTextColor="#979797"
            value={caption}
            onChangeText={setCaption}
            multiline={true}
            onFocus={() => setIsKeyboardVisible(true)}
            onBlur={() => setIsKeyboardVisible(false)}
          />
        </View>
      )}

      <View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setActivityModalVisible(true)}
        >
          <Text style={styles.text}>Select Daily Goal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setUsersModalVisible(true)}
        >
          <Text style={styles.text}>Select Users</Text>
        </TouchableOpacity>
      </View>
      <SelectGoal 
        isVisible={activityModalVisible}
        loading={fetching}
        activitiesList={activities || []}
        timezone={timezone}
        onClose={() => setActivityModalVisible(false)}
        onNext={handleActivityNext}
      />
      <SelectUsers 
        isVisible={usersModalVisible}
        loading={fetching}
        acceptedFriends={acceptedFriends}
        acceptedGroups={acceptedGroups}
        acceptedCommunities={acceptedCommunities}
        onClose={() => setUsersModalVisible(false)}
        onSend={() => console.log("Send Button Pressed")}
      />
    </KeyboardAvoidingView>
  );
}


export default AuthWrapper(DisplayPicturePage);