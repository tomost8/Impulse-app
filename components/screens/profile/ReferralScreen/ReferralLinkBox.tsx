import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
} from "react-native";
import Clipboard from '@react-native-clipboard/clipboard'; 
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


interface Props {
  referralLink: string;
}

const ReferralLinkBox: React.FC<Props> = ({ referralLink }) => {
  const handleCopy = () => {
    Clipboard.setString(referralLink); // Still works the same way
  };

  const handleShare = async () => {
    await Share.share({
      message: `Join me on Impulse! Use my referral link: ${referralLink}`,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Click below to copy link or share invite link directly:</Text>
      <TouchableOpacity style={styles.touchable} onPress={handleCopy}>
        <View style={styles.linkBox}>
          <Ionicons name="link-outline" size={18} color="#555" />
          <Text style={styles.link} numberOfLines={1}>
            {referralLink}
          </Text>
        </View>
      </TouchableOpacity>


      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleCopy}>
          <MaterialCommunityIcons name="message-processing" size={20} color="#C35A74" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Ionicons name="mail" size={20} color="#C35A74" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
    fontWeight: 400,
    fontFamily: 'OpenSans',
    textAlign: "center",
  },
  touchable: {
    width: '100%',
  },
  linkBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: "#F7F7F7",
  },
  link: {
    color: "#000",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'OpenSans',
    textAlign: 'center',
    marginLeft: 10,
    padding: 0,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#F7F7F7",
    marginHorizontal: 12,
    padding: 8,
    borderRadius: 8,
  },
});

export default ReferralLinkBox;
