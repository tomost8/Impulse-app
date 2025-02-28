import { Picker } from '@react-native-picker/picker';
import { GENDER_OPTIONS, GOAL_OPTIONS } from '@/utils/userOptions';
import { TIMEZONE_OPTIONS } from '@/utils/timezoneProcessing';
import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, ScrollView } from 'react-native';
import styles from '@/utils/testStyles';
import { processAndUploadImage, pickImage as pickImageFromProcessing } from '@/utils/imageProcessing';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/userOptions';

export default function EditProfileScreenOld({
    user,
    isUserLoading,
    formData,
    handleFormDataChange,
    handleFormSubmit,
    isSubmitting,
  }: {
    user: any,
    isUserLoading: boolean,
    formData: any,
    handleFormDataChange: any,
    handleFormSubmit: any,
    isSubmitting: boolean,
  }) {
    const pickImage = async () => {
      const uri = await pickImageFromProcessing(handleFormDataChange);
      if (uri) {
        console.log('Picked image URI:', uri);
        handleFormDataChange('profile_picture', uri);
      }
    };
  
    if (isUserLoading || isSubmitting) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileImageContainer}>
            <Image
              source={formData.profile_picture ? 
                { uri: formData.profile_picture } : 
                user.profile_picture ? 
                  { uri: user.profile_picture } :
                  { uri: DEFAULT_PROFILE_PICTURE }
              }
              style={styles.profileImage}
            />
            <TouchableOpacity 
              onPress={pickImage}
            >
              <Text style={styles.text}>Edit Photo</Text>
            </TouchableOpacity>
          </View>
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            value={formData.email}
            onChangeText={(text) => handleFormDataChange('email', text)}
            editable={false}
        />
        <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="gray"
            value={formData.first_name}
            onChangeText={(text) => handleFormDataChange('first_name', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="gray"
            value={formData.last_name}
            onChangeText={(text) => handleFormDataChange('last_name', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="gray"
            value={formData.username}
            onChangeText={(text) => handleFormDataChange('username', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="gray"
            value={formData.age.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numValue = text.replace(/[^0-9]/g, '');
              handleFormDataChange('age', numValue);
            }}
        />
        <View style={[styles.input, { paddingHorizontal: 0 }]}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => handleFormDataChange('gender', value)}
            style={{ color: formData.gender ? '#000' : 'gray' }}
          >
            {GENDER_OPTIONS.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
        <View style={[styles.input, { paddingHorizontal: 0 }]}>
          <Picker
            selectedValue={formData.timezone}
            onValueChange={(value) => handleFormDataChange('timezone', value)}
            style={{ color: formData.timezone ? '#000' : 'gray' }}
          >
            <Picker.Item label="Select Timezone" value="" />
            {TIMEZONE_OPTIONS.map((tz) => (
              <Picker.Item key={tz.value} label={tz.label} value={tz.value} />
            ))}
          </Picker>
        </View>
        <TextInput
            style={styles.input}
            placeholder="Bio"
            placeholderTextColor="gray"
            value={formData.bio}
            onChangeText={(text) => handleFormDataChange('bio', text)}
        />
        <View style={[styles.input, { paddingHorizontal: 0 }]}>
          <Picker
            selectedValue={formData.primary_goal}
            onValueChange={(value) => handleFormDataChange('primary_goal', value)}
            style={{ color: formData.primary_goal ? '#000' : 'gray' }}
          >
            {GOAL_OPTIONS.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
        <View style={[styles.input, { paddingHorizontal: 0 }]}>
          <Picker
            selectedValue={formData.secondary_goal}
            onValueChange={(value) => handleFormDataChange('secondary_goal', value)}
            style={{ color: formData.secondary_goal ? '#000' : 'gray' }}
          >
            {GOAL_OPTIONS.filter(option => option.value !== formData.primary_goal)
              .map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.text}>Save Profile</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }