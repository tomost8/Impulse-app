import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { s } from "react-native-size-matters";
import { router } from 'expo-router';

interface WalkthroughPopupProps {
  visible: boolean;
  onClose: () => void;
}

const WalkthroughPopup: React.FC<WalkthroughPopupProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Impulse!</Text>
          
          <Image
            source={require("@/assets/images/icAppLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.description}>
            Feel free to explore the app on your own! If you need help anywhere, navigate to "Feature Guide" in Account Settings to look at the walkthroughs.
          </Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Let's get productive!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: s(20),
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginBottom: s(20),
  },
  logo: {
    width: s(150),
    height: s(150),
    marginBottom: s(20),
  },
  description: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#242020',
    textAlign: 'center',
    marginBottom: s(30),
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#DE728D',
    borderRadius: 100,
    paddingVertical: s(13),
    paddingHorizontal: s(30),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});

export default WalkthroughPopup;



