import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { s } from 'react-native-size-matters';
import { useMemoriesNav } from '@/contexts/MemoriesContext';

interface ImageGridProps {
  memories: any[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ memories }) => {
  //console.log('ImageGrid - Received data:', memories);
  
  const screenWidth = Dimensions.get('window').width;
  const itemSize = (screenWidth - 48) / 3; // 3 columns with padding

  const { setSession } = useMemoriesNav();
  const ids = useMemo(() => memories.map(m => m.id), [memories]);

  const renderMemoryItem = ({ item, index }: { item: any; index: number }) => {
    const handlePress = () => {
      if (item.id) {
        // Set navigation session for prev/next POST navigation
        setSession({ ids, index });
        router.push(`/post/${item.id}`);
      }
    };

    const hasImage = item.mediaUrls && item.mediaUrls.length > 0;

    return (
      <TouchableOpacity
        style={[styles.memoryItem, { width: itemSize, height: itemSize * 1.4 }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        {hasImage ? (
          <Image
            source={{ uri: item.mediaUrls[0] }}
            style={styles.memoryImage}
            resizeMode="cover"
          />
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
        renderItem={renderMemoryItem}
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
  memoryImage: {
    width: '100%',
    height: '100%',
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
