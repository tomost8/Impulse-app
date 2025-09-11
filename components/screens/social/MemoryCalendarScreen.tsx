import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, StatusBar, SafeAreaView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { s } from 'react-native-size-matters';
import { router } from 'expo-router';
import LoadingScreen from "@/components/ui/common/loading";
import { goals } from '@/utils/goals';
import { DayComponent } from '@/components/features/posts';


interface MemoriesScreenProps {
  loading: boolean;
  memories: any[];
  initialDate?: string;                 // 'YYYY-MM-DD' (e.g., '2025-08-01')
  initialSelectedCategories?: string[]; // optional
}

export default function MemoryCalendarScreen({ loading, memories, initialDate, initialSelectedCategories }: MemoriesScreenProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelectedCategories || []);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);

  // Filter by category first, then keep only one post per day
  const dailyMemories = useMemo(() => {
    if (!memories || memories.length === 0) return [];
    
    // Apply category filter first
    let filteredPosts = memories;
    if (selectedCategories.length > 0) {
      filteredPosts = memories.filter((post: any) => selectedCategories.includes(post.category));
    }

    // Filter to keep only one post per day from the category-filtered results
    const uniqueDailyPosts = filteredPosts.reduce((acc: any[], post: any) => {
      const existingPost = acc.find(p => p.date === post.date);
      if (!existingPost) {
        acc.push(post);
      }
      return acc;
    }, [])
    .map((post: any) => ({
      id: post.id,
      date: post.date,
      mediaUrls: post.mediaUrls,
      caption: post.caption,
      category: post.category
    }));

    return uniqueDailyPosts;
  }, [memories, selectedCategories]);

  if (loading) {
    return <LoadingScreen />;
  }

  const currentDate = new Date();
  const fallbackToday = new Date().toISOString().split('T')[0];
  const INITIAL_DATE = initialDate || fallbackToday;

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={1}
      onPress={() => setShowCategoryDropdown(false)}
    >
      {/* Header */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.singleRowHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image source={require("@/assets/icons/backArrow.png")} style={styles.backIcon} />
            <Text style={styles.headerTitle}>Memories</Text>
          </TouchableOpacity>

          {/* Filter Button */}
          <View style={styles.filterButtonWrapper}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setShowCategoryDropdown(!showCategoryDropdown);
              }}
              style={[
                styles.filterButton,
                showCategoryDropdown && styles.filterButtonActive
              ]}
            >
              <Ionicons 
                name="options-outline" 
                size={20} 
                color={showCategoryDropdown ? '#DE728D' : '#666'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Monthly Calendar Memories Display */}
      <Calendar
        current={INITIAL_DATE}
        firstDay={1}
        hideExtraDays
        onDayPress={() => {}}
        dayComponent={({ date }: any) => (
          <DayComponent 
            date={date}
            imagesByDate={dailyMemories}
          />
        )}
        theme={{
          arrowColor: '#DE728D',
          textDayFontSize: 14,
          dayTextColor: '#1E1E1E',
        }}
      />

      {/* Category Dropdown */}
      {showCategoryDropdown && (
        <View style={styles.categoryDropdownContainer}>
          <TouchableOpacity 
            style={styles.categoryDropdown}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.categoryDropdownTitle}>Filter by Category</Text>
            <View style={styles.categoryDropdownButtons}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.category}
                  onPress={() => {
                    if (selectedCategories.includes(goal.category)) {
                      setSelectedCategories(selectedCategories.filter(cat => cat !== goal.category));
                    } else {
                      setSelectedCategories([...selectedCategories, goal.category]);
                    }
                  }}
                  style={[
                    styles.categoryDropdownButton,
                    selectedCategories.includes(goal.category) && styles.categoryDropdownButtonActive
                  ]}
                >
                  <View style={styles.categoryButtonContent}>
                    <Image 
                      source={goal.categoryIcon as any} 
                      style={[
                        styles.categoryIcon,
                        selectedCategories.includes(goal.category) && styles.categoryIconActive
                      ]}
                      resizeMode="contain"
                    />
                    <Text style={[
                      styles.categoryDropdownButtonText,
                      selectedCategories.includes(goal.category) && styles.categoryDropdownButtonTextActive
                    ]}>
                      {goal.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  // Header section
  safeArea: {
    backgroundColor: '#E0EDFD',
  },
  singleRowHeader: {
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    paddingBottom: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backIcon: {
    width: 10,
    height: 17,
    tintColor: '#242020',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
  },
  
  // Filter button section
  filterButtonWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  filterButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#f0f0f0',
    borderColor: '#DE728D',
  },
  
  // Category dropdown section
  categoryDropdownContainer: {
    position: 'absolute',
    top: 80,
    right: 16,
    zIndex: 200,
  },
  categoryDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 15,
  },
  categoryDropdownTitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryDropdownButtons: {
    gap: 4,
  },
  categoryDropdownButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 16,
    height: 16,
    tintColor: '#DE728D',
  },
  categoryIconActive: {
    tintColor: '#fff',
  },
  categoryDropdownButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  categoryDropdownButtonText: {
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
    flex: 1,
  },
  categoryDropdownButtonTextActive: {
    color: '#fff',
  },
  
});
