import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { goals } from '@/utils/goals';


const CreateCommunityScreen = () => {
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [joinCode, setJoinCode] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCreate = () => {
    console.log({
      communityName,
      description,
      profileImage,
      selectedCategories,
      joinCode
    });
    // Handle community creation logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Create Community</Text>
          </View>

          {/* Profile Image Section */}
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={handleImagePick}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderContainer}>
                <Image 
                  source={require("@/assets/icons/camera.png")}
                  style={styles.cameraIcon}
                />
              </View>
            )}
          </TouchableOpacity>

          {/* Community Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Community Name</Text>
            <TextInput
              style={styles.textInput}
              value={communityName}
              onChangeText={setCommunityName}
              placeholder="Enter community name"
              placeholderTextColor="#979797"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description (optional)</Text>
            <TextInput
              style={[styles.textInput, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add a description for your community"
              placeholderTextColor="#979797"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Goal Category Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Goal Category Selection</Text>
            <View style={styles.categoriesGrid}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.categoryButton,
                    selectedCategories.includes(goal.id.toString()) && styles.selectedCategory
                  ]}
                  onPress={() => toggleCategory(goal.id.toString())}
                >
                  <Image
                    source={goal.categoryIcon || require('@/assets/icons/categoryworkout.png')}
                    style={[
                      styles.categoryIcon,
                      selectedCategories.includes(goal.id.toString()) && styles.selectedCategoryIcon
                    ]}
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedCategories.includes(goal.id.toString()) && styles.selectedCategoryText
                  ]}>
                    {goal.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Join Code Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Community Join Code</Text>
            <TextInput
              style={styles.textInput}
              value={joinCode}
              onChangeText={setJoinCode}
              placeholder="Enter join code"
              placeholderTextColor="#979797"
            />
          </View>

          {/* Create Button */}
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreate}
          >
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 65,
    backgroundColor: '#E0EDFD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#242020',
  },
  pageTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    fontWeight: '600',
    marginLeft: 6,
  },
  profileImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 16,
    right: 16,
    tintColor: '#979797',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  descriptionInput: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#DE728D',
    gap: 6,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#DE728D',
  },
  categoryIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
  selectedCategoryIcon: {
    tintColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#DE728D',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  createButton: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    backgroundColor: '#DE728D',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default CreateCommunityScreen;
