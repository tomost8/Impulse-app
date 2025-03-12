import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const Header = () => {
  const handleCreate = () => {
    router.push('/social/createCommunity');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image 
          source={require("@/assets/icons/backArrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Discover</Text>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={handleCreate}
      >
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#000000',
  },
  createButton: {
    width: 75,
    height: 30,
    backgroundColor: '#DE728D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexShrink: 0,
    marginLeft: 155,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
  },
});

export default Header;
