import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FullPostCard } from '@/components/features/posts';
import { getTimeAgo } from '@/utils/timezoneProcessing';
import LoadingScreen from '@/components/ui/common/loading';
import { getFormattedDate, convertUtcToLocal } from '@/utils/timezoneProcessing';
import { ProgressBar as StoryProgressBar } from '@/components/features/posts';
import { useDataProvider } from '@/contexts/DataProviderContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface StoryScreenProps {
  posts: any[];
  loading: boolean;
}



// Custom loading component for story view
const StoryLoadingScreen = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <View style={[styles.topSafeArea, { height: insets.top }]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading memories...</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const MemoryStoryScreen = ({ posts, loading }: StoryScreenProps) => {
  if (loading) return <StoryLoadingScreen />;
  const { timezone} = useDataProvider();

  const insets = useSafeAreaInsets();
  if (!posts) return null;

  // Track which side (0/1) is visible for double-sided picture
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const images: string[] = posts[currentIndex]?.mediaUrls || [];
  const formattedDate = getFormattedDate(posts[0].created_at, timezone);
  const [formattedTime, setFormattedTime] = useState(convertUtcToLocal(posts[currentIndex].created_at, timezone));

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < posts.length) {
      setFormattedTime(convertUtcToLocal(posts[currentIndex].created_at, timezone));
    } else {
      router.back();
    }
  }, [currentIndex, images]);

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex((i) => i + 1);
      setMainImageIndex(0);
    } else {
    router.back();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setMainImageIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topSafeArea, { height: insets.top }]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.storyHeaderContainer}>
              <StoryProgressBar currentIndex={currentIndex} total={posts.length} />
            </View>

            <FullPostCard
              isStory={true}
              post={{
                // timeAgo: getTimeAgo(posts[currentIndex].created_at), // Not used anywhere in FullPostCard
                // username: posts[currentIndex].username, // Not used in story header
                // profileImage: posts[currentIndex].profileImage, // Not used in story header
                category: posts[currentIndex].category,
                images: posts[currentIndex].mediaUrls,
                caption: posts[currentIndex].caption,
                // liked: posts[currentIndex].liked, // Not used in story mode (PostFooter hidden)
                // likeCount: posts[currentIndex].likeCount, // Not used in story mode (PostFooter hidden)
                // commentCount: posts[currentIndex].commentCount, // Not used in story mode (PostFooter hidden)
              }}
              mainImageIndex={mainImageIndex}
              onChangeMainImageIndex={setMainImageIndex}
              formattedDate={formattedDate}
              formattedTime={formattedTime}
              onNext={handleNext}
              onPrev={handlePrev}
            />

            <TouchableOpacity
              onPress={() => {
                if (!posts[currentIndex]?.id) {
                Alert.alert('Error', 'Post ID is missing!');
                return;
                }
                router.push({ pathname: '/post/[id]', params: { id: String(posts[currentIndex].id) } });
              }}
              style={[styles.postButton,]}
            >
              <Text style={[
                styles.postButtonText,
                styles.postButtonTextActive
              ]}>
                {"View Post"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  storyHeaderContainer: { backgroundColor: "#000", paddingTop: 12, },
  topSafeArea: { backgroundColor: '#000000', width: '100%' },
  safeArea: { flex: 1 },
  contentContainer: { flex: 1, backgroundColor: '#000000' },
  scrollView: { flex: 1 },
  headerTitle: { color: '#242020', fontSize: 16, fontFamily: 'Poppins', fontWeight: '600' },
  postButton: { alignSelf: 'flex-end', marginRight: 16, marginVertical: 12, borderRadius: 20, borderWidth: 1, alignItems: 'center', borderColor: '#E0EDFD',},
  postButtonText: { fontSize: 12, fontFamily: 'Poppins', fontWeight: '500', paddingVertical: 4, paddingHorizontal:12, color: '#666' },
  postButtonTextActive: { color: '#fff' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
});

export default MemoryStoryScreen;
