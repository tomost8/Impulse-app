import styles from "@/utils/testStyles";
import { View, Image, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef, useContext } from 'react';
import { CameraHeaderContext } from './_layout';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { debugRenders, pageDisplay } from '@/utils/debug';
import { useUserData } from "@/services/UserPreferencesContext";
import { useCreatePost } from '@/hooks/graphql/posts/mutations';
import { processAndUploadImage } from '@/utils/imageProcessing';
import { useUserInfo } from '@/services/UserContext';
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
  const { authToken } = useUserInfo();
  const { fetching, user, activities, friends, chats, communities } = useUserData();
  const timezone = user?.timezone;
  const acceptedFriends = friends?.filter((friend: any) => friend.status === "ACCEPTED");
  const acceptedGroups = chats?.filter((chat: any) => chat.status === "ACCEPTED" && chat.chat.type === "group");
  const acceptedCommunities = communities?.filter((community: any) => community.status === "ACCEPTED");

  useEffect(() => {
    context.setPictureTaken(true);
    if (id) context.setId(Number(id));
    if (category) context.setCategory(category as string);
  }, []);

  // Mutations
  const { createPost } = useCreatePost();
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = async () => {
    setIsCreatingPost(true);
    try {
      const postTargets = selectedPostTargets.map(target => {
        const [targetType, targetId] = target.match(/([a-zA-Z]+)(\d+)/)?.slice(1) || [];
        return {
          target_type: targetType,
          target_id: parseInt(targetId, 10),
        };
      });
      const downloadURLs = await Promise.all(imageSources.map(processAndUploadImage));
      const input = {
        authorId: user?.id,
        activityId: context?.id,
        category: context?.category,
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

  // Modals
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [captionFooterVisible, setCaptionFooterVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  // Form Data State Management
  const [caption, setCaption] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [selectedPostTargets, setSelectedPostTargets] = useState<string[]>([]);
  const togglePostTarget = (optionId: string) => {
    setSelectedPostTargets(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  const handleSelectActivity = (activityId: string, category: string) => {
    context?.setId(Number(activityId));
    context?.setCategory(category);
    console.log("Selected Activity:", activityId, category);
  };

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

  const handlePostSend = () => {
    console.log("Selected Post Targets:", selectedPostTargets);
    handleCreatePost();
  };

  // Debug
  const loading = fetching;
  const debugRenders = false;
  if (debugRenders && !loading) {
    console.log("Rendering DisplayPicturePage\n",
      "Activities:", activities, "\n",
      "Friends:", acceptedFriends, "\n",
      "Chats:", acceptedGroups, "\n",
      "Communities:", acceptedCommunities, "\n",
      "Front Image Source:", frontImageSource, "\n",
      "Back Image Source:", backImageSource, "\n",
      "Caption:", caption, "\n",
      "Selected Post Targets:", selectedPostTargets, "\n",
    );
  }

  
  if (pageDisplay) {
    return <PictureTaken />;
  }
  

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
        onSelectActivity={handleSelectActivity}
      />
      <SelectUsers 
        isVisible={usersModalVisible}
        loading={fetching}
        userId={user?.id}
        acceptedFriends={acceptedFriends}
        acceptedGroups={acceptedGroups}
        acceptedCommunities={acceptedCommunities}
        selectedPostTargets={selectedPostTargets}
        togglePostTarget={togglePostTarget}
        onClose={() => setUsersModalVisible(false)}
        onSend={handlePostSend}
      />
    </KeyboardAvoidingView>
  );
}


export default AuthWrapper(DisplayPicturePage);