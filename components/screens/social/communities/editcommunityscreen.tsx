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
  Platform,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { goals } from '@/utils/goals';
import { DEFAULT_COMMUNITY_THUMBNAIL } from '@/utils/userOptions';

interface EditCommunityScreenProps {
  loading: boolean;
  formData: {
    name: string;
    description: string;
    thumbnail: string | null;
    code: string;
  };
  handleFormDataChange: (field: string, value: string) => void;
  selectedCategories: string[];
  handleToggleCategory: (categoryId: string) => void;
  handleUpdateCommunity: () => void;
}

const EditCommunityScreen = (props: EditCommunityScreenProps) => {
  const { id } = useLocalSearchParams();
  const [joinCode, setJoinCode] = useState('Run4Fun');

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Updated to use modern array syntax
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        props.handleFormDataChange('thumbnail', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Ensure values are always strings
  const getInputValue = (value: string | null | undefined): string => {
    return value || '';
  };

  return (
    <View style={styles.container}>
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
            <SafeAreaView>
              <View style={styles.topBarContent}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Image 
                    source={require("@/assets/icons/backArrow.png")}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Manage</Text>
                <TouchableOpacity onPress={() => router.push(`/community/${id}/editMembers`)}>
                  <Text style={styles.editText}>Edit Members</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>

          {/* Profile Image Section */}
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={handleImagePick}
          >
            <Image
              source={props.formData.thumbnail ? { uri: props.formData.thumbnail } : { uri: DEFAULT_COMMUNITY_THUMBNAIL }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Community Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Community Name</Text>
            <TextInput
              style={styles.textInput}
              value={getInputValue(props.formData.name)}
              onChangeText={(value) => props.handleFormDataChange('name', value)}
              placeholder="Enter community name"
              placeholderTextColor="#979797"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description (optional)</Text>
            <TextInput
              style={[styles.textInput, styles.descriptionInput]}
              value={getInputValue(props.formData.description)}
              onChangeText={(value) => props.handleFormDataChange('description', value)}
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
                    props.selectedCategories.includes(goal.category) && styles.selectedCategory
                  ]}
                  onPress={() => props.handleToggleCategory(goal.category)}
                >
                  <Image
                    source={goal.categoryIcon || require('@/assets/icons/categoryworkout.png')}
                    style={[
                      styles.categoryIcon,
                      props.selectedCategories.includes(goal.category) && styles.selectedCategoryIcon
                    ]}
                  />
                  <Text style={[
                    styles.categoryText,
                    props.selectedCategories.includes(goal.category) && styles.selectedCategoryText
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
              value={getInputValue(props.formData.code)}
              onChangeText={(value) => props.handleFormDataChange('code', value)}
              placeholder="Enter join code"
              placeholderTextColor="#979797"
            />
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={props.handleUpdateCommunity}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBar: {
    backgroundColor: '#E0EDFD',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 12,
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
    marginLeft: 4,
  },
  editText: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#DE728D',
    paddingLeft: 165,
    paddingTop: 2,
  },
  profileImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
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
  saveButton: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    backgroundColor: '#DE728D',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
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

export default EditCommunityScreen;
