import styles from '@/utils/testStyles';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { goals } from '@/utils/goals';
import { pickImage } from '@/utils/imageProcessing';
export default function CreateCommunityScreenOld({
    handleCreateCommunity,
    isCreatingCommunity,
    formData,
    handleFormDataChange,
    communityCategories,
    handleCategoryChange,
  }: {
    handleCreateCommunity: (input: any) => void;
    isCreatingCommunity: boolean;
    formData: any;
    handleFormDataChange: (field: string, value: string) => void;
    communityCategories: string[];
    handleCategoryChange: (category: string) => void;
  }) {
    if (isCreatingCommunity) {
      return <Text>Loading...</Text>;
    }
    return (
      <View>
        <Text>Create Community</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={"gray"}
          value={formData.name}
          onChangeText={(text) => handleFormDataChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor={"gray"}
          value={formData.description}
          onChangeText={(text) => handleFormDataChange('description', text)}
        />
        <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => pickImage(handleFormDataChange, 'thumbnail')}>
            {formData.thumbnail ? (
              <Image source={{ uri: formData.thumbnail }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {goals.map((goal) => (
          <View key={goal.id} style={styles.checkbox}>
            <Text style={styles.text}>{goal.label}</Text>
            <Checkbox
              status={communityCategories.includes(goal.category) ? 'checked' : 'unchecked'}
              onPress={() => handleCategoryChange(goal.category)}
            />
          </View>
        ))}
        <TouchableOpacity 
          style={[styles.button, !formData.name && {
            backgroundColor: 'gray',
            opacity: 0.5, 
          }]} 
          onPress={handleCreateCommunity} 
          disabled={!formData.name}
        >
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }