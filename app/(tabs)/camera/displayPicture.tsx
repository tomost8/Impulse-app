import { useState, useEffect, useRef, useContext } from 'react';
import { CameraHeaderContext } from './_layout';
import AuthWrapper from '@/contexts/AuthWrapper';
import { useLocalSearchParams, router } from 'expo-router';
// GraphQL Hooks
import { useCreatePost } from '@/hooks/graphql/posts/mutations';
// Components
import { View, StyleSheet } from "react-native";
import DisplayPictureScreen from "@/components/screens/camera/SingleLensCamera/displayPictureScreen";
import SelectUsers from "@/components/screens/camera/SharedPages/selectUsers";
import SelectGoal from "@/components/screens/camera/SharedPages/selectGoal";
// Services
import { useAuth } from '@/contexts/AuthContext';
import { useDataProvider } from "@/contexts/DataProviderContext";
import { useDataRefetch } from '@/contexts/DataFetcher';
import { uploadImage } from '@/utils/imageProcessing';

const DisplayPicturePage = () => {
  const context = useContext(CameraHeaderContext);
  if (!context) return null;
  const { id, category, frontPhoto, backPhoto } = useLocalSearchParams();
  // Get image sources
  const frontImageSource = frontPhoto ? { uri: frontPhoto as string } : null; // Selfie
  const backImageSource = backPhoto ? { uri: backPhoto as string } : null;
  const [mainImageSource, setMainImageSource] = useState(backImageSource || frontImageSource);
  const [previewImageSource, setPreviewImageSource] = useState(
    frontImageSource && backImageSource ? frontImageSource : null
  );
  const imageSources: string[] = [frontImageSource, backImageSource]
    .filter(Boolean)
    .map(source => source!.uri);

  // User Data
  const { authToken } = useAuth();
  const { fetching, user, activities, friends, chats, communities } = useDataProvider();
  const { refetchData } = useDataRefetch();
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
      const downloadURLs = await Promise.all(imageSources.map(source => uploadImage(source, 'posts')));
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
      console.log("createPost response:", response);
      if (response.success) {
        console.log("Post created successfully:", response.post);
        // Refetch relevant data after successful post creation
        await refetchData({
          activities: true,      // Update activity completion status
          friendsFeed: true,     // Show new post in friends feed
          communityFeed: true,   // Show new post in community feed
        });
      } else {
        console.error("Create post failed - Response:", response);
        throw new Error("createPost response.success false: " + JSON.stringify(response.errors));
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  // Modals + Buttons
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [activityButtonVisible, setActivityButtonVisible] = useState(true);
  const [captionFooterVisible, setCaptionFooterVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const [usersButtonVisible, setUsersButtonVisible] = useState(false);
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
  };

  useEffect(() => {
    if (id && category) {
      //console.log("Selected Activity:", id, category);
      setActivityModalVisible(false);
      setActivityButtonVisible(false);
      setCaptionFooterVisible(true);
      setUsersButtonVisible(true);
      setUsersModalVisible(false);
    } else {
      //console.log("No Activity Selected");
      setActivityButtonVisible(true);
      setActivityModalVisible(false);
      setCaptionFooterVisible(false);
      setUsersButtonVisible(false);
      setUsersModalVisible(false);
    }
  }, [id, category]);

  const handleActivityNext = () => {
    console.log("Next Activity Button Pressed");
    setActivityModalVisible(false);
    setActivityButtonVisible(false);
    setCaptionFooterVisible(true);
    setUsersButtonVisible(true);
  };

  const handlePostSend = () => {
    console.log("Selected Post Targets:", selectedPostTargets);
    handleCreatePost();
    setCaptionFooterVisible(false);
    setUsersModalVisible(false);
    router.replace("/home");
  };

  const swapImages = () => {
    setMainImageSource(previewImageSource);
    setPreviewImageSource(mainImageSource);
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

  return (
    <View style={styles.container}>
      <DisplayPictureScreen
        mainImageSource={mainImageSource}
        previewImageSource={previewImageSource}
        swapImages={swapImages}
        captionFooterVisible={captionFooterVisible}
        isKeyboardVisible={isKeyboardVisible}
        caption={caption}
        setCaption={setCaption}
        setIsKeyboardVisible={setIsKeyboardVisible}
        activityButtonVisible={activityButtonVisible}
        usersButtonVisible={usersButtonVisible}
        setActivityModalVisible={setActivityModalVisible}
        setUsersModalVisible={setUsersModalVisible}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default AuthWrapper(DisplayPicturePage);