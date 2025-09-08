import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { goals } from '@/utils/goals';
import ImageGrid from './ImageGrid';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';

interface MemoriesProps {
  // Expect full user's posts; we filter client-side by month and categories.
  // If you switch to server-side month queries later, just replace source of `memories`.
  memories: any[];
}

const Memories: React.FC<MemoriesProps> = ({ memories }) => {
  const [mode, setMode] = useState<'grid' | 'calendar'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<{year: number, month: number}>({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const initialDate = dayjs(new Date(selectedMonth.year, selectedMonth.month, 1)).format('YYYY-MM-DD');
  const categoriesParam = selectedCategories.join(',');

  // Filter posts by selected month, then by categories
  const monthFiltered = useMemo(() => {
    if (!memories) return [];
    return memories.filter((post: any) => {
      const d = new Date(post.created_at);
      return d.getMonth() === selectedMonth.month && d.getFullYear() === selectedMonth.year;
    });
  }, [memories, selectedMonth]);

  const filtered = useMemo(() => {
    let arr = monthFiltered;
    if (selectedCategories.length > 0) {
      arr = arr.filter((post: any) => selectedCategories.includes(post.category));
    }
    // Reverse chronological (most recent first)
    arr = arr.slice().sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return arr;
  }, [monthFiltered, selectedCategories]);

  // For calendar preview: keep only the first picture posted in that day
  // Requirement says: show only first picture of the day (we'll use earliest by time)
  const dailyPreviews = useMemo(() => {
    // earliest post per day -> chronological by created_at asc first, then pick first per YYYY-MM-DD
    const asc = monthFiltered
      .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
      .slice()
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    const map = new Map<string, any>();
    for (const p of asc) {
      const key = new Date(p.created_at).toISOString().split('T')[0];
      if (!map.has(key)) map.set(key, p);
    }
    return map; // key: 'YYYY-MM-DD' -> first post of that day
  }, [monthFiltered, selectedCategories]);

  // Story modal state for given day
  const [storyDate, setStoryDate] = useState<string | null>(null);
  const dayPosts = useMemo(() => {
    if (!storyDate) return [];
    // posts for the day, chronological for story
    const posts = monthFiltered
      .filter(p => {
        const key = new Date(p.created_at).toISOString().split('T')[0];
        return key === storyDate && (selectedCategories.length === 0 || selectedCategories.includes(p.category));
      })
      .slice()
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    return posts;
  }, [storyDate, monthFiltered, selectedCategories]);

  const [storyIndex, setStoryIndex] = useState(0);
  const closeStory = () => { setStoryDate(null); setStoryIndex(0); };

  const onDayPress = (day: any) => {
    const dateStr = day.dateString; // 'YYYY-MM-DD'
    // Only open if we have at least one post that matches category filter
    const exists = dayPostsExist(dateStr);
    if (exists) {
      setStoryDate(dateStr);
      setStoryIndex(0);
    }
  };
  const dayPostsExist = (dateStr: string) => {
    return !!monthFiltered.find(p => {
      const key = new Date(p.created_at).toISOString().split('T')[0];
      return key === dateStr && (selectedCategories.length === 0 || selectedCategories.includes(p.category));
    });
  };

  const INITIAL_DATE = dayjs(new Date(selectedMonth.year, selectedMonth.month, 1)).format('YYYY-MM-DD');

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
              router.push({
                pathname: '/account/memories',
                params: { initialDate, categories: categoriesParam},
              });
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
                name="options-outline" 
                size={20} 
                color={showCategoryDropdown ? '#DE728D' : '#666'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <ImageGrid memories={filtered} />

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
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, idx) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => {
                    setSelectedMonth({year: selectedMonth.year, month: idx});
                    setShowMonthDropdown(false);
                  }}
                  style={[
                    styles.monthGridButton,
                    selectedMonth.month === idx && styles.monthGridButtonActive
                  ]}
                >
                  <Text style={[
                    styles.monthGridButtonText,
                    selectedMonth.month === idx && styles.monthGridButtonTextActive
                  ]}>
                    {m}
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

      {/* Story Modal (tap-through for the selected day) */}
      <Modal visible={!!storyDate} transparent animationType="fade" onRequestClose={closeStory}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {dayPosts[storyIndex] && (
            <>
              <Image source={{ uri: dayPosts[storyIndex].mediaUrls?.[0] }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
              <View style={{ position: 'absolute', top: 40, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white' }}>
                  {dayPosts[storyIndex].category} • {dayjs(dayPosts[storyIndex].created_at).format('h:mm A')}
                </Text>
                <TouchableOpacity onPress={closeStory}><Text style={{ color: 'white' }}>Close</Text></TouchableOpacity>
              </View>
              {/* tap zones */}
              <TouchableOpacity
                onPress={() => setStoryIndex(i => Math.max(0, i - 1))}
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%' }}
              />
              <TouchableOpacity
                onPress={() => {
                  if (storyIndex < dayPosts.length - 1) setStoryIndex(i => i + 1);
                  else closeStory();
                }}
                style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60%' }}
              />
            </>
          )}
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  filterContainer: {
    flexDirection: 'row', paddingHorizontal: 16, marginVertical: 12,
    justifyContent: 'space-between', alignItems: 'center',
  },
  rightButtonsContainer: { flexDirection: 'row', gap: 12 },
  iconButton: {
    padding: 8, borderRadius: 20, backgroundColor: '#f0f0f0',
    borderWidth: 1, borderColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center',
  },
  iconButtonActive: { backgroundColor: '#f0f0f0', borderColor: '#DE728D' },
  monthButtonWrapper: { position: 'relative', zIndex: 100 },
  monthButton: {
    paddingHorizontal: 24, paddingVertical: 8, borderRadius: 10,
    borderWidth: 1, 
  },
  monthButtonActive: { backgroundColor: '#DE728D', borderColor: '#DE728D' },
  monthButtonText: { fontSize: 12, fontFamily: 'Poppins', fontWeight: '500', color: '#666' },
  monthButtonTextActive: { color: '#fff' },
  filterButtonWrapper: { position: 'relative', zIndex: 100 },

  // Month dropdown styles
  monthDropdownContainer: { position: 'absolute', top: 60, left: 16, zIndex: 200 },
  monthDropdown: {
    backgroundColor: '#fff', borderRadius: 8, padding: 16, width: 250,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 15,
  },
  yearNavigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, gap: 16 },
  yearArrowButton: { padding: 4, borderRadius: 4, backgroundColor: '#f0f0f0' },
  yearText: { fontSize: 14, fontFamily: 'Poppins', fontWeight: '600', color: '#242020', minWidth: 60, textAlign: 'center' },
  monthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' },
  monthGridButton: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, backgroundColor: '#f0f0f0',
    borderWidth: 1, borderColor: '#e0e0e0', width: '22%', height: 36, alignItems: 'center', justifyContent: 'center',
  },
  monthGridButtonActive: { backgroundColor: '#DE728D', borderColor: '#DE728D' },
  monthGridButtonText: { fontSize: 10, fontFamily: 'Poppins', fontWeight: '500', color: '#666', textAlign: 'center' },
  monthGridButtonTextActive: { color: '#fff' },

  // Category dropdown styles
  categoryDropdownContainer: { position: 'absolute', top: 60, right: 16, zIndex: 200 },
  categoryDropdown: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12, minWidth: 180,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 15,
  },
  categoryDropdownTitle: { fontSize: 12, fontFamily: 'Poppins', fontWeight: '600', color: '#242020', marginBottom: 8, textAlign: 'center' },
  categoryDropdownButtons: { gap: 4 },
  categoryDropdownButton: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, backgroundColor: '#f0f0f0',
    borderWidth: 1, borderColor: '#e0e0e0',
  },
  categoryButtonContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryIcon: { width: 16, height: 16, tintColor: '#DE728D' },
  categoryIconActive: { tintColor: '#fff' },
  categoryDropdownButtonActive: { backgroundColor: '#DE728D', borderColor: '#DE728D' },
  categoryDropdownButtonText: { fontSize: 11, fontFamily: 'Poppins', fontWeight: '500', color: '#666', flex: 1 },
  categoryDropdownButtonTextActive: { color: '#fff' },

  // Calendar day styles
  calDayContainer: { width: 40, height: 50, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  calDayImage: { width: 40, height: 50, borderRadius: 6, position: 'absolute', top: 0, left: 0, resizeMode: 'cover' },
  calDayPlaceholder: { width: 40, height: 50, borderRadius: 6, backgroundColor: '#f0f0f0', position: 'absolute', top: 0, left: 0 },
  calDayText: { color: '#333', fontWeight: 'bold', zIndex: 1 },
});

export default Memories;