import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import JoinChallengeScreen from "@/components/screens/home/JoinChallengeScreen";
import AuthWrapper from "@/contexts/AuthWrapper";
import { useJoinChallenge } from "@/hooks/graphql/challenges/mutations";
import LoadingScreen from "@/components/ui/common/loading";

const JoinChallengePage = () => {
  const { challenge } = useLocalSearchParams<{ challenge?: string }>();
  console.log("🍾 Received challenge param:", challenge);

  const loading = !challenge;

  const challengeItem = challenge ? JSON.parse(challenge) : null;

  const [joined, setJoined] = useState(false);

  if (!challengeItem) {
    return <LoadingScreen />;
  }

  // Access properties safely
  const {
    id,
    title,
    category,
    description,
    length,
    points_bronze,
    points_silver,
    points_gold,
    points_diamond,
  } = challengeItem.challenge;

  const totalDays = length?.split("_")[1] ?? 0;
  const dayLength = `${totalDays} Days`;

  const milestones = [
    { title, badge: "Bronze", days: points_bronze / 50, points: points_bronze },
    { title, badge: "Silver", days: points_silver / 50, points: points_silver },
    { title, badge: "Gold", days: points_gold / 50, points: points_gold },
    { title, badge: "Diamond", days: +totalDays, points: points_diamond },
  ];

  const { joinChallenge } = useJoinChallenge();

  const handleJoinChallenge = async () => {
    console.log("Join Challenge button pressed for challenge ID:", id);
    try {
      const result = await joinChallenge(id);
      if (result.success) {
        console.log("Successfully joined challenge:", id);
        setJoined(true); // mark as joined
      } else {
        console.error("Failed to join challenge:", result.error);
      }
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  return (
    <JoinChallengeScreen
      isLoading={loading}
      title={title}
      category={category}
      dayLength={dayLength}
      description={description}
      joined={joined}
      onJoinChallenge={handleJoinChallenge}
      milestones={milestones}
    />
  );
};

export default AuthWrapper(JoinChallengePage);
