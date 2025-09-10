import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import FullPostCard from '@/components/features/posts/FullPostCard';
import { getTimeAgo } from '@/utils/timezoneProcessing';
import LoadingScreen from '@/components/ui/common/loading';
import { saveImageToCameraRoll, } from '@/utils/memories';
import StoryProgressBar from './progressBar';

interface StoryScreenProps {
  post: any;
  loading: boolean;
  formattedDate?: string | null;
  formattedTime?: string | null;
}



const StoryScreen = ({ post, loading, formattedDate, formattedTime }: StoryScreenProps) => {
  if (loading) return <LoadingScreen />;
  
  const insets = useSafeAreaInsets();
  if (!post) return null;

  // Track which side (0/1) is visible for double-sided picture
  const [side, setSide] = useState(0);
  const images: string[] = post?.mediaUrls || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleUrl, setVisibleUrl] = useState(images[0] ?? null);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < images.length) {
      setVisibleUrl(images[currentIndex]);
    } else {
      router.back();
    }
  }, [currentIndex, images]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
    router.back();
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const onSave = async () => {
    try {
      await saveImageToCameraRoll(visibleUrl);
      Alert.alert('Saved', 'Image saved to camera roll');
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Could not save image');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topSafeArea, { height: insets.top }]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.headerExtension}>
              <View style={styles.headerContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <Image source={require("@/assets/icons/backArrow.png")} style={styles.backIcon} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Story</Text>

                <TouchableOpacity onPress={onSave} style={{ marginLeft: 'auto' }}>
                  <Text style={{ color: '#DE728D', fontWeight: '700' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View>
              <StoryProgressBar currentIndex={currentIndex} total={images.length} />
              {formattedDate && (
                <View style={{backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 12, }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins',fontWeight: '600',color: '#DE728D',textAlign: 'left',}}>{formattedDate}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'Poppins',fontWeight: '600',color: '#DE728D',textAlign: 'left',}}>{formattedTime}</Text>
                </View>
              )}
            </View>

            <FullPostCard
              isStory={true}
              post={{
                timeAgo: getTimeAgo(post.created_at),
                images: [visibleUrl], // ensure the shown image matches the toggle
                category: post.category
              }}
            />

            <TouchableOpacity
              onPress={() => {
                if (!post?.id) {
                Alert.alert('Error', 'Post ID is missing!');
                return;
                }
                router.push({ pathname: '/post/[id]', params: { id: String(post.id) } });
              }}
              style={[styles.postButton, styles.postButtonActive]}
            >
              <Text style={[
                styles.postButtonText,
                styles.postButtonTextActive
              ]}>
                {"View Post"}
              </Text>
            </TouchableOpacity>

            <View
              pointerEvents="box-none"
              style={StyleSheet.absoluteFill}
            >
              <View
                style={{ position: 'absolute',left: 0,right: 0,top: insets.top + 80,bottom: insets.bottom + 120,flexDirection: 'row', }}
                pointerEvents="box-none"
              >
                <TouchableOpacity
                  onPress={handlePrev}
                  activeOpacity={1}
                  style={{ flex: 1 }}
                />
                <TouchableOpacity
                  onPress={handleNext}
                  activeOpacity={1}
                  style={{ flex: 1 }}
                />
              </View>
            </View>

          </ScrollView>

        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topSafeArea: { backgroundColor: '#E0EDFD', width: '100%' },
  bottomSafeArea: { backgroundColor: '#FFFFFF', width: '100%' },
  safeArea: { flex: 1 },
  contentContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  headerExtension: { backgroundColor: '#E0EDFD', width: '100%' },
  bottomContainer: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#FFFFFF', paddingBottom: 8 },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  backButton: { marginRight: 8 },
  backIcon: { width: 10, height: 15, tintColor: '#242020', marginLeft: 6, marginRight: 6 },
  headerTitle: { color: '#242020', fontSize: 16, fontFamily: 'Poppins', fontWeight: '600' },
  postButton: { alignSelf: 'flex-end', marginRight: 24, marginVertical: 8, borderRadius: 20, borderWidth: 1, alignItems: 'center', },
  postButtonActive: { backgroundColor: '#DE728D', borderColor: '#DE728D' },
  postButtonText: { fontSize: 12, fontFamily: 'Poppins', fontWeight: '500', paddingVertical: 8, paddingHorizontal:16, color: '#666' },
  postButtonTextActive: { color: '#fff' },
});

export default StoryScreen;
