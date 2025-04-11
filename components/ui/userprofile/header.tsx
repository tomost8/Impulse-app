import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

interface HeaderProps {
  onBackPress?: () => void;
  name: string;
  username: string;
  profileImage: any;
  title?: string;
  showBackButton?: boolean;
  rightIcon?: any;
  onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onBackPress,
  name,
  username,
  profileImage,
  title,
  showBackButton = true,
  rightIcon,
  onRightIconPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Crescent Background */}
      <View style={styles.crescentContainer}>
        <View style={styles.crescent} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Image 
              source={require("@/assets/icons/backArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <Text style={[
          styles.headerTitle,
          !showBackButton && styles.headerTitleLeft
        ]}>{title || "Partner Insights"}</Text>
        {rightIcon && (
          <TouchableOpacity 
            style={styles.rightButton}
            onPress={onRightIconPress}
          >
            <Image 
              source={rightIcon}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image 
          source={profileImage}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    paddingBottom: 16,
  },
  crescentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 350,
    overflow: 'hidden',
  },
  crescent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    borderBottomLeftRadius: 800,
    borderBottomRightRadius: 800,
    backgroundColor: '#E0EDFD',
    transform: [
      { scaleX: 1.3 },
      { translateY: -350 },
    ],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 24,
    zIndex: 1,
  },
  backButton: {
    width: 11,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, 
    marginLeft: 5, 
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginLeft: 8,
  },
  headerTitleLeft: {
    marginLeft: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 12,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#242020',
    marginTop: 16,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#979797',
    marginTop: 4,
  },
  rightButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default Header;
