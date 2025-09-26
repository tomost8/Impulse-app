import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import AuthWrapper from '@/contexts/AuthWrapper';
// GraphQL Hooks
import { useGetMyChallenges } from '@/hooks/graphql/challenges/queries';
// Components
import ChallengeDetailScreen from '@/components/screens/home/ChallengeDetailScreen';
import Header from '@/components/ui/common/headers/Header';
// Debug
import { debugRenders } from '@/debug/utils';
import { useDataProvider } from '@/contexts/DataProviderContext';
import { useJoinChallenge } from '@/hooks/graphql/challenges/mutations';

const ChallengeDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("😎 Challenge ID", id);
  const router = useRouter();
  const { fetching, user } = useDataProvider();
  const [renderCounter, setRenderCounter] = useState(0);
  const [joined, setJoined] = useState(false);

  const { joinChallenge } = useJoinChallenge();

  // Query for Loading State - My Challenges Only
  const myChallengesRef = useRef<any | null>(null);
  const hasFetchedMyChallenges = useRef(false);
  const { activeChallenges, completedChallenges, success, errors: myChallengesErrors, fetched: hasNewMyChallengesData } = useGetMyChallenges(
    !hasFetchedMyChallenges.current && !fetching && !!user?.id
  );

  useEffect(() => {
    if (!hasNewMyChallengesData) {
      return;
    }
    if (hasNewMyChallengesData) {
      myChallengesRef.current = { activeChallenges, completedChallenges };
      hasFetchedMyChallenges.current = true;
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewMyChallengesData]);

  // Find the specific challenge by ID from both active and completed challenges
  const challenge = React.useMemo(() => {
    if (!id || !myChallengesRef.current) return null;
    
    const { activeChallenges, completedChallenges } = myChallengesRef.current;
    const allChallenges = [...(activeChallenges || []), ...(completedChallenges || [])];
    
    return allChallenges.find((challenge: any) => 
      challenge.userChallenge.id === parseInt(id)
    );
  }, [id, myChallengesRef.current]);

  console.log("🎭 Detailed Challenge: ", challenge)

  const handleJoinChallenge = async (challengeId: number ) => {
    console.log("Join Challenge button pressed for challenge ID:", challengeId);
    try {
      const result = await joinChallenge(challengeId);
      if (result.success) {
        console.log("Successfully joined challenge:", challengeId);
        setJoined(true); // mark as joined
      } else {
        console.error("Failed to join challenge:", result.error);
      }
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  // Debug
  const loading = !hasFetchedMyChallenges.current;
  if (debugRenders && !loading) {
    const myChallenges = myChallengesRef.current;
    console.log('Rendering ChallengeDetailPage\n' +
      `Challenge ID: ${id}\n` +
      `Active Challenges: ${myChallenges?.activeChallenges?.length || 0}\n` +
      `Completed Challenges: ${myChallenges?.completedChallenges?.length || 0}\n` +
      `Found Challenge: ${challenge ? 'Yes' : 'No'}\n` +
      `Render Counter: ${renderCounter}`);
  }

  if (!id) {
    return null;
  }

  // Handle errors
  if (!loading && myChallengesErrors?.length > 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header 
          title="Challenge Details"
          onBackPress={() => router.back()}
        />
        <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#242020", marginBottom: 16, textAlign: "center" }}>
            Error Loading Challenge
          </Text>
          <Text style={{ fontSize: 16, color: "#EF4444", textAlign: "center", marginBottom: 16 }}>
            {myChallengesErrors[0].message}
          </Text>
          <Text style={{ fontSize: 14, color: "#A4ACBC", textAlign: "center", lineHeight: 20 }}>
            Please try again later.
          </Text>
        </View>
      </View>
    );
  }

  // Handle challenge not found case
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

  return <ChallengeDetailScreen
    challengeId={id}
    challenge={challenge}
    isLoading={loading}
    joined={joined}
    onJoinChallenge={handleJoinChallenge}
  />;
}

export default AuthWrapper(ChallengeDetailPage);