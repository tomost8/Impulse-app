import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

interface FilterProps {
  communities: any[];
  handleFilterChange: (selectedCommunities: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ communities, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);

  const toggleCommunity = (communityId: string) => {
    setSelectedCommunities(prev => {
      const newSelection = prev.includes(communityId)
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId];
      
      handleFilterChange(newSelection);
      return newSelection;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.filterButton} 
        onPress={() => setIsOpen(!isOpen)}
      >
        <Image 
          source={require('@/assets/icons/filter.png')} 
          style={styles.filterIcon} 
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.communityTagsContainer}>
          <View style={styles.communityTags}>
            {communities?.map((community) => (
              <TouchableOpacity
                key={community.id}
                style={[
                  styles.communityTag,
                  selectedCommunities.includes(community.id) && styles.selectedTag
                ]}
                onPress={() => toggleCommunity(community.id)}
              >
                <Text style={[
                  styles.communityTagText,
                  selectedCommunities.includes(community.id) && styles.selectedTagText
                ]}>
                  {community.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    marginBottom: 10,
  },
  filterButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginRight: 16,
  },
  filterIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  communityTagsContainer: {
    marginTop: 2,
    paddingHorizontal: 18,
  },
  communityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  communityTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#DE728D',
    backgroundColor: 'transparent',
  },
  selectedTag: {
    backgroundColor: '#DE728D',
  },
  communityTagText: {
    color: '#DE728D',
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 600,
  },
  selectedTagText: {
    color: '#FFF',
  },
});

export default Filter;
