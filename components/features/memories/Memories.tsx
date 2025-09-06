import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import MemoriesGrid from './MemoriesGrid';

interface MemoriesProps {
  memories: any[];
}

const Memories: React.FC<MemoriesProps> = ({ memories }) => {
  const [filterBy, setFilterBy] = useState<'all' | 'month' | 'category'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<{year: number, month: number}>({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });

  // Filter memories based on current filter
  const getFilteredMemories = () => {
    if (!memories) return [];
    
    let filtered = memories;
    
    if (filterBy === 'month') {
      filtered = filtered.filter((post: any) => {
        const postDate = new Date(post.created_at);
        return postDate.getMonth() === selectedMonth.month && postDate.getFullYear() === selectedMonth.year;
      });
    } else if (filterBy === 'category' && selectedCategory) {
      filtered = filtered.filter((post: any) => post.category === selectedCategory);
    }
    
    return filtered;
  };

  return (
    <View style={styles.container}>
      {/* View All Memories Button */}
      <TouchableOpacity
        onPress={() => router.push('/account/memories')}
        style={styles.memoriesButton}
      >
        <Text style={styles.memoriesButtonText}>View All Memories</Text>
      </TouchableOpacity>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setFilterBy('all')}
          style={[
            styles.filterButton,
            filterBy === 'all' && styles.filterButtonActive
          ]}
        >
          <Text style={[
            styles.filterButtonText,
            filterBy === 'all' && styles.filterButtonTextActive
          ]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setFilterBy('month')}
          style={[
            styles.filterButton,
            filterBy === 'month' && styles.filterButtonActive
          ]}
        >
          <Text style={[
            styles.filterButtonText,
            filterBy === 'month' && styles.filterButtonTextActive
          ]}>
            By Month
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setFilterBy('category')}
          style={[
            styles.filterButton,
            filterBy === 'category' && styles.filterButtonActive
          ]}
        >
          <Text style={[
            styles.filterButtonText,
            filterBy === 'category' && styles.filterButtonTextActive
          ]}>
            By Category
          </Text>
        </TouchableOpacity>
      </View>

      {/* Month Selection (only show when month filter is active) */}
      {filterBy === 'month' && (
        <View style={styles.monthContainer}>
          <Text style={styles.monthLabel}>Select Month:</Text>
          <View style={styles.monthButtons}>
            {/* Year Selection */}
            <View style={styles.yearContainer}>
              <Text style={styles.yearLabel}>Year:</Text>
              <View style={styles.yearButtons}>
                {[selectedMonth.year - 1, selectedMonth.year, selectedMonth.year + 1].map((year) => (
                  <TouchableOpacity
                    key={year}
                    onPress={() => setSelectedMonth({...selectedMonth, year})}
                    style={[
                      styles.yearButton,
                      selectedMonth.year === year && styles.yearButtonActive
                    ]}
                  >
                    <Text style={[
                      styles.yearButtonText,
                      selectedMonth.year === year && styles.yearButtonTextActive
                    ]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Month Selection */}
            <View style={styles.monthButtonsContainer}>
              <Text style={styles.monthLabel}>Month:</Text>
              <View style={styles.monthButtonsGrid}>
                {[
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ].map((month, index) => (
                  <TouchableOpacity
                    key={month}
                    onPress={() => setSelectedMonth({...selectedMonth, month: index})}
                    style={[
                      styles.monthButton,
                      selectedMonth.month === index && styles.monthButtonActive
                    ]}
                  >
                    <Text style={[
                      styles.monthButtonText,
                      selectedMonth.month === index && styles.monthButtonTextActive
                    ]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Category Selection (only show when category filter is active) */}
      {filterBy === 'category' && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Select Category:</Text>
          <View style={styles.categoryButtons}>
            {['STUDYING_WORKING', 'FOOD', 'WELLNESS', 'EXERCISE', 'SOCIAL'].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                  {category.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Memories Grid */}
      <MemoriesGrid memories={getFilteredMemories()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  memoriesButton: {
    backgroundColor: '#DE728D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  memoriesButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 12,
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  monthContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  monthLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 8,
  },
  monthButtons: {
    gap: 12,
  },
  yearContainer: {
    marginBottom: 8,
  },
  yearLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
    marginBottom: 6,
  },
  yearButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  yearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  yearButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  yearButtonText: {
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
  },
  yearButtonTextActive: {
    color: '#fff',
  },
  monthButtonsContainer: {
    marginTop: 8,
  },
  monthButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  monthButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 40,
    alignItems: 'center',
  },
  monthButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  monthButtonText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
  },
  monthButtonTextActive: {
    color: '#fff',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#DE728D',
    borderColor: '#DE728D',
  },
  categoryButtonText: {
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
});

export default Memories;
