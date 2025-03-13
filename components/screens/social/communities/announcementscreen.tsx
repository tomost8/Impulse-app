import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { router } from 'expo-router';

interface AnnouncementScreenProps {
  communityName?: string;
}

const AnnouncementScreen: React.FC<AnnouncementScreenProps> = ({
  communityName = "Gabe's Running Club"
}) => {
  const [announcement, setAnnouncement] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSend = () => {
    console.log('Sending announcement:', announcement);
    setAnnouncement('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Image 
                source={require("@/assets/icons/backArrow.png")}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{communityName}</Text>
          </View>

          {/* Messages Container */}
          <View style={styles.messagesContainer} />

          {/* Input Container with KeyboardAvoidingView */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            style={styles.keyboardAvoidView}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={announcement}
                onChangeText={setAnnouncement}
                placeholder="Make announcement..."
                placeholderTextColor="#979797"
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSend}
              >
                <Image 
                  source={require("@/assets/icons/Sent.png")}
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
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
  title: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#242020',
    marginLeft: 6,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  keyboardAvoidView: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
  },
  sendButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#DE728D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
});

export default AnnouncementScreen;
