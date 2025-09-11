import React, { useMemo, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { s } from 'react-native-size-matters';
import { useMemoriesNav } from '@/contexts/MemoriesContext';

interface ImageGridProps {
  memories: any[];
}

interface PostGridItemProps {
  item: any;
  itemSize: number;
  onPress: () => void;
}

const PostGridItem: React.FC<PostGridItemProps> = ({ item, itemSize, onPress }) => {
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [smallImageLoading, setSmallImageLoading] = useState(true);
  
  const hasImage = item.mediaUrls && item.mediaUrls.length > 0;
  const hasMultipleImages = item.mediaUrls && item.mediaUrls.length > 1;

  return (
    <TouchableOpacity
      style={[styles.memoryItem, { width: itemSize, height: itemSize * 1.4 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {hasImage ? (
        <View style={styles.imageContainer}>
          {/* Main image (always rendered) */}
          <Image
            source={{ uri: item.mediaUrls[0] }}
            style={styles.memoryImage}
            resizeMode="cover"
            onLoadStart={() => setMainImageLoading(true)}
            onLoadEnd={() => setMainImageLoading(false)}
            onError={() => setMainImageLoading(false)}
          />
          
          {/* Loading indicator for main image */}
          {mainImageLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#DE728D" />
            </View>
          )}
          
          {/* Small overlay image in corner */}
          {hasMultipleImages && (
            <View style={styles.smallImageContainer}>
              <Image
                source={{ uri: item.mediaUrls[1] }}
                style={styles.smallImage}
                resizeMode="cover"
                onLoadStart={() => setSmallImageLoading(true)}
                onLoadEnd={() => setSmallImageLoading(false)}
                onError={() => setSmallImageLoading(false)}
              />
              
              {/* Loading indicator for small image */}
              {smallImageLoading && (
                <View style={styles.smallLoadingOverlay}>
                  <ActivityIndicator size="small" color="#DE728D" />
                </View>
              )}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText} numberOfLines={3}>
            {item.caption ? `${item.caption}\n${item.category || 'No category'}\nPost #${item.id}` : `${item.category || 'No category'}\nPost #${item.id}`}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const ImageGrid: React.FC<ImageGridProps> = ({ memories }) => {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - 48) / 3; // 3 columns with padding

  const { setSession } = useMemoriesNav();
  const ids = useMemo(() => memories.map(m => m.id), [memories]);

  const renderPostGridItem = ({ item, index }: { item: any; index: number }) => {
    const handlePress = () => {
      if (item.id) {
        // Set navigation session for prev/next POST navigation
        setSession({ ids, index });
        router.push(`/post/${item.id}`);
      }
    };

    return (
      <PostGridItem
        item={item}
        itemSize={itemSize}
        onPress={handlePress}
      />
    );
  };

  if (!memories || memories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No memories yet</Text>
        <Text style={styles.emptySubtext}>Start posting to see your memories here!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memories}
        renderItem={renderPostGridItem}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: s(16),
  },
  title: {
    fontSize: s(18),
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: s(12),
    paddingHorizontal: s(16),
  },
  gridContainer: {
    paddingHorizontal: s(16),
    paddingBottom: s(110), // Add bottom spacing for scroll view
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: s(8),
    gap: s(8),
  },
  memoryItem: {
    borderRadius: s(8),
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  memoryImage: {
    width: '100%',
    height: '100%',
  },
  smallImageContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 30,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  smallImage: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(8),
  },
  placeholderText: {
    fontSize: s(10),
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: s(40),
    paddingHorizontal: s(16),
  },
  emptyText: {
    fontSize: s(16),
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
    marginBottom: s(8),
  },
  emptySubtext: {
    fontSize: s(14),
    fontFamily: 'Poppins',
    color: '#999',
    textAlign: 'center',
  },
});

export default ImageGrid;
