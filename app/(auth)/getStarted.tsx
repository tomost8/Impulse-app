import { View, TouchableOpacity } from 'react-native';
import styles from '@/utils/testStyles';
import { Text, Button, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import type { AppTheme } from '../theme/theme';

import GetStartedScreen from '@/components/screens/SignupLogin/Login/getStarted';

export default function GetStarted() {
  return <GetStartedScreen />;
}

/*
export default function AuthScreen() {
  // 获取主题对象
  const theme = useTheme<AppTheme>();


  // 使用主题创建样式
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.primaryPink,
      marginBottom: 24,
      textAlign: 'left',
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.roundness,
      marginVertical: 16,
    },
    buttonContent: {
      paddingVertical: 8,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    loginText: {
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>

        <View style={styles.logo} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Let's get started
        </Text>

        <Button
          mode="contained"
          onPress={() => router.push('/signup1')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Create Account
        </Button>

        <View style={styles.loginContainer}>
          <Text variant="bodyMedium">Already have an account? </Text>
          <Text
            variant="bodyMedium"
            style={styles.loginText}
            onPress={() => router.push('/login1')}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}
*/
