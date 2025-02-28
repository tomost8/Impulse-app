import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TabSelectorProps {
  onTabChange: (tab: 'friends' | 'communities') => void;
  selectedTab: 'friends' | 'communities'; // Add this prop
}

const TabSelector: React.FC<TabSelectorProps> = ({ onTabChange, selectedTab }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => onTabChange('friends')}
      >
        <Text style={[
          styles.tabText,
          selectedTab === 'friends' && styles.selectedTabText
        ]}>
          Friends
        </Text>
        {selectedTab === 'friends' && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => onTabChange('communities')}
      >
        <Text style={[
          styles.tabText,
          selectedTab === 'communities' && styles.selectedTabText
        ]}>
          My Communities
        </Text>
        {selectedTab === 'communities' && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    marginLeft: 16,
  },
  tabButton: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#242020',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  selectedTabText: {
    fontWeight: '600',
  },
  underline: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
    height: 2,
    backgroundColor: '#242020',
  },
});

export default TabSelector;
