import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategoriesBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const categories = [
    "Rise and Shine",
    "Workout",
    "Studying / Working",
    "Wellness",
    "Food",
    "My Passion / Hobby"
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onSelectCategory(category)}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedButton
          ]}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#DE728D',
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#DE728D',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#DE728D',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CategoriesBar;
