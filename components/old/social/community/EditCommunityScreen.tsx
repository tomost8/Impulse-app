import { pickImage } from '@/utils/imageProcessing';
import styles from '@/utils/testStyles';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function EditCommunityScreenOld({ 
    formData, handleFormDataChange, isUpdatingCommunity, handleUpdateCommunity 
}: { 
    formData: any, 
    handleFormDataChange: (field: string, value: string) => void, 
    isUpdatingCommunity: boolean, 
    handleUpdateCommunity: () => Promise<void> 
}) {
    if (isUpdatingCommunity) {
        return <Text>Loading...</Text>;
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Community</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleUpdateCommunity}>
        <Text style={styles.text}>Update Community</Text>
      </TouchableOpacity>
    </View>
  );
}