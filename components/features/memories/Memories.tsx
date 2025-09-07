import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { goals } from '@/utils/goals';

import ImageGrid from './ImageGrid';

interface MemoriesProps {
  memories: any[];
}

const Memories: React.FC<MemoriesProps> = ({ memories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<{year: number, month: number}>({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);

  const getFilteredMemories = () => {
    if (!memories) return [];
    let filtered = memories;
    // Month filter
    filtered = filtered.filter((post: any) => {
      const postDate = new Date(post.created_at);
      return postDate.getMonth() === selectedMonth.month && postDate.getFullYear() === selectedMonth.year;
    });
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post: any) => selectedCategories.includes(post.category));
    }
    return filtered;
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        setShowMonthDropdown(false);
        setShowCategoryDropdown(false);
      }}
    >
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {/* Month Filter Button */}
        <View style={styles.monthButtonWrapper}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              setShowMonthDropdown(!showMonthDropdown);
            }}
            style={[
              styles.monthButton,
              showMonthDropdown && styles.monthButtonActive
            ]}
          >
            <Text style={[
              styles.monthButtonText,
              showMonthDropdown && styles.monthButtonTextActive
            ]}>
              {new Date(selectedMonth.year, selectedMonth.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.rightButtonsContainer}>
          {/* Monthly Memories Button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              router.push('/account/memories');
            }}
            style={styles.iconButton}
          >
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </TouchableOpacity>
          
          {/* Category Filter Button */}
          <View style={styles.filterButtonWrapper}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                setShowCategoryDropdown(!showCategoryDropdown);
              }}
              style={[
                styles.iconButton,
                showCategoryDropdown && styles.iconButtonActive
              ]}
            >
              <Ionicons 
                name="filter-outline" 
                size={20} 
                color={showCategoryDropdown ? '#DE728D' : '#666'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Image Grid */}
      <ImageGrid memories={getFilteredMemories()} />
      
      {/* Month Dropdown - rendered at top level */}
      {showMonthDropdown && (
        <View style={styles.monthDropdownContainer}>
          <TouchableOpacity 
            style={styles.monthDropdown}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Year Navigation */}
            <View style={styles.yearNavigation}>
              <TouchableOpacity
                onPress={() => setSelectedMonth({...selectedMonth, year: selectedMonth.year - 1})}
                style={styles.yearArrowButton}
              >
                <Ionicons name="chevron-back" size={16} color="#666" />
              </TouchableOpacity>
              
              <Text style={styles.yearText}>{selectedMonth.year}</Text>
              
              <TouchableOpacity
                onPress={() => setSelectedMonth({...selectedMonth, year: selectedMonth.year + 1})}
                style={styles.yearArrowButton}
              >
                <Ionicons name="chevron-forward" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            {/* Month Grid */}
            <View style={styles.monthGrid}>
              {[
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ].map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() => {
                    setSelectedMonth({year: selectedMonth.year, month: index});
                    setShowMonthDropdown(false);
                  }}
                  style={[
                    styles.monthGridButton,
                    selectedMonth.month === index && styles.monthGridButtonActive
                  ]}
                >
                  <Text style={[
                    styles.monthGridButtonText,
                    selectedMonth.month === index && styles.monthGridButtonTextActive
                  ]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Category Dropdown - rendered at top level */}
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
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#f0f0f0',
    borderColor: '#DE728D',
  },
  monthButtonWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  monthButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  monthButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  monthButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
  },
  monthButtonTextActive: {
    color: '#fff',
  },
  filterButtonWrapper: {
    position: 'relative',
    zIndex: 100,
  },
  // Month dropdown styles
  monthDropdownContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 200,
  },
  monthDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 15,
  },
  yearNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 16,
  },
  yearArrowButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  yearText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    minWidth: 60,
    textAlign: 'center',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'space-between',
  },
  monthGridButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '22%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthGridButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  monthGridButtonText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  monthGridButtonTextActive: {
    color: '#fff',
  },
  // Category dropdown styles
  categoryDropdownContainer: {
    position: 'absolute',
    top: 60,
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

export default Memories;
