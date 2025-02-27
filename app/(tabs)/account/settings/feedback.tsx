import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from '@/utils/testStyles';

export default function FeedbackScreen() {
  const handleFeedbackPress = () => {
    Linking.openURL('https://share.hsforms.com/1XRfLG1DsS929ZXpTqtXcrAscwc9');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            We want to hear from you! (some type of header)
        </Text>
        <Text style={styles.text}>
            We value your input more than anything. 
            Tell us what's working, what's not, or what you'd love to see next!
            Who knows? Your suggestion might just become our next feature!
        </Text>
        <Text style={styles.text}>
            As a thank you for leaving feedback, you will be entered into a raffle for
            various gift card prizes. Reward selection is in the form below!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFeedbackPress}>
            <Text style={styles.text}>Feedback Form</Text>
        </TouchableOpacity>
    </View>
  );
}
