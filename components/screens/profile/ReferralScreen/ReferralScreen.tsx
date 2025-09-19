import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { s } from 'react-native-size-matters';
import Header from '@/components/ui/common/headers/Header';
import ReferralIllustration from './ReferralIllustration';
import ReferralLinkBox from './ReferralLinkBox';

interface ReferralScreenProps {
  loading: boolean;
  referralLink: string;
}

const ReferralScreen: React.FC<ReferralScreenProps> = ({ loading, referralLink }) => {
  const router = useRouter();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title='Referrals' onBackPress={() => router.back()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Build your circle!</Text>
          <Text style={styles.subtitle}>
            The key to success? A supportive network! 
          </Text>

          <ReferralIllustration />

          <Text style={styles.rewardText}>
            You and your friend each earn 1,500 points when they complete
            their first goal by sharing a picture
          </Text>

          <ReferralLinkBox referralLink={referralLink} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0EDFD',
  },
  scrollView: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: s(16),
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: s(16),
  },
  subtitle: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans',
    fontSize: 14,
    fontWeight: '600',
    marginTop: s(16),
    marginBottom: s(24),
  },
  rewardText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans',
    marginTop: s(32),
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: s(16),
  },
  bold: {
    fontWeight: '700',
  },
});

export default ReferralScreen;
