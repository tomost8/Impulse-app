import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import AuthWrapper from '@/contexts/AuthWrapper';
// Components
import ChallengeDetailScreen from '@/components/screens/home/ChallengeDetailScreen';
import Header from '@/components/ui/common/headers/Header';
// Debug
import { debugRenders } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';
// GraphQL Hooks
import { useGetChallengeDayMedia, useGetFriendsInChallenge } from '@/hooks/graphql/challenges/queries';

const ChallengeDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  if (!id) { return null };

  
  const router = useRouter();
  const { fetching, challenges } = useDataProvider();

  // Find the specific challenge by ID from both active and completed challenges
  let challenge = null;
  if (id && challenges) {
    const { activeChallenges, completedChallenges, failedChallenges } = challenges;
    const allChallenges = [...(activeChallenges || []), ...(completedChallenges || []), ...(failedChallenges || [])];
    challenge = allChallenges.find((challenge: any) => 
      challenge.userChallenge.id === parseInt(id)
    );
  }

  // Get additional challenge data
  const userChallengeId = challenge?.userChallenge?.id;
  const challengeId = challenge?.userChallenge?.challenge_id;
  const status = challenge?.userChallenge?.status;

  // Daily Recap query
  const { entries } = useGetChallengeDayMedia(userChallengeId, !!userChallengeId);
  
  // Friends in challenge query
  const { friends: participants, success: participantsLoadingSuccess, error: participantsError } = 
    useGetFriendsInChallenge(challengeId, status, !!challengeId);


  // Debug
  const loading = fetching;
  if (debugRenders) {
    console.log('=== ChallengeDetailPage Debug ===');
    if (!challenge) {
      console.log('No challenge found for UserChallenge with ID:', id);
    } else {
      console.log(`Details for UserChallenge with ID: ${id}\n` +
        `  - Title: ${challenge.userChallenge?.challenge?.title},` +
        ` Category: ${challenge.userChallenge?.challenge?.category},` +
        ` Length: ${challenge.userChallenge?.challenge?.length}\n` +
        `  - Status: ${challenge.userChallenge?.status}\n` +
        `  - Days Completed: ${challenge.userChallenge?.days_completed}\n` +
        `  - Days Remaining: ${challenge.progress?.daysRemaining}\n` +
        `  - Progress: ${challenge.progress?.progressLabel}\n` +
        `  - Badges/Friends: ${challenge.badgesEarned?.length || 0}/${challenge.friendsCompleted?.length || 0}`
      );
    }
  }

  // Handle challenge not found case: should be handled at screen level probably
  /*
  if (!loading && !challenge) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header 
          title="Challenge Details"
          onBackPress={() => router.back()}
        />
        <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#242020", marginBottom: 16, textAlign: "center" }}>
            Challenge Not Found
          </Text>
          <Text style={{ fontSize: 18, color: "#5E6676", marginBottom: 12, textAlign: "center" }}>
            Challenge ID: {id}
          </Text>
          <Text style={{ fontSize: 14, color: "#A4ACBC", textAlign: "center", lineHeight: 20 }}>
            This challenge was not found in your active or completed challenges.
          </Text>
        </View>
      </View>
    );
  }
  */

  return <ChallengeDetailScreen
    challenge={challenge}
    isLoading={loading}
    entries={entries}
    participants={participants}
  />;
}

export default AuthWrapper(ChallengeDetailPage);