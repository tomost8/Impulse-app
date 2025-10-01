import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/debug/utils';

// Query - Get Explore Challenges
export const GET_EXPLORE_CHALLENGES = gql`
  query GetExploreChallenges($category: Category) {
    getExploreChallenges(category: $category) {
      success
      challenges {
        challenge {
          id
          title
          description
          category
          length
          points_bronze
          points_silver
          points_gold
          points_diamond
        }
        isJoined
        isLocked
        shortDescription
        status
        userChallengeId
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetExploreChallenges(category?: string, hasFetched: boolean=true, verbose: boolean=false) {
  const { data, loading, error } = useQuery(GET_EXPLORE_CHALLENGES, {
    variables: { category: category || null },
    skip: !hasFetched
  });
  
  const fetched = hasFetched && !loading;
  
  if (debugQueries && fetched) {
    const challenges = data?.getExploreChallenges?.challenges || [];
    const challengesCount = challenges.length;
    
    // Summary line
    const summary = {
      success: data?.getExploreChallenges?.success || false,
      errors: data?.getExploreChallenges?.errors || null,
      category: category || 'all',
      challengesCount
    };
    
    let formattedData = `useGetExploreChallenges: ${JSON.stringify(summary)}\n`;
    
    // Log all challenges with their status (verbose mode)
    if (verbose) {
      challenges.forEach((challengeItem: any) => {
        const challenge = challengeItem.challenge;
        const maxPoints = Math.max(challenge.points_bronze, challenge.points_silver, challenge.points_gold, challenge.points_diamond);
        const status = `${challengeItem.isJoined ? 'Joined' : 'Not Joined'} | ${challengeItem.isLocked ? 'Locked' : 'Available'}`;
        formattedData += `  - ${challenge.title}, Max_points: ${maxPoints}, Status: ${status}\n`;
      });
    }
    
    console.log(formattedData);
  }
  
  return {
    challenges: data?.getExploreChallenges?.challenges || [],
    success: data?.getExploreChallenges?.success || false,
    errors: data?.getExploreChallenges?.errors || [],
    fetched: fetched,
    error: error?.message || null
  };
}

// Query - Get My Challenges
export const GET_MY_CHALLENGES = gql`
  query GetUserChallenges {
    getUserChallenges {
      success
      activeChallenges {
        userChallenge {
          id
          status
          challenge_id
          started_at
          ends_at
          days_completed
          challenge {
            title
            category
            length
          }
        }
        progress {
          daysRemaining
          progressLabel
          daysUntilNextBadge
        }
        friendsCompleted {
          id
          username
          first_name
          last_name
        }
      }
      completedChallenges {
        userChallenge {
          id
          challenge_id
          status
          started_at
          ends_at
          completed_at
          days_completed
          badge_level
          challenge {
            title
            category
            length
          }
        }
        badgesEarned
        friendsCompleted {
          id
          username
          first_name
          last_name
        }
      }
      failedChallenges {
        userChallenge {
          id
          challenge_id
          status
          started_at
          ends_at
          completed_at
          days_completed
          badge_level
          challenge {
            title
            category
            length
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetMyChallenges(authToken: string, shouldFetch: boolean=true) {
  const { data, loading, error } = useQuery(GET_MY_CHALLENGES, {
    skip: !shouldFetch,
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    }
  });
  
  const fetched = shouldFetch && !loading;
  
  if (debugQueries && fetched) {
    const activeChallenges = data?.getUserChallenges?.activeChallenges || [];
    const completedChallenges = data?.getUserChallenges?.completedChallenges || [];
    const failedChallenges = data?.getUserChallenges?.failedChallenges || [];
    const activeCount = activeChallenges.length;
    const completedCount = completedChallenges.length;
    const failedCount = failedChallenges.length;
    
    // Summary line
    const summary = {
      success: data?.getUserChallenges?.success || false,
      errors: data?.getUserChallenges?.errors || null,
      activeCount,
      completedCount,
      failedCount
    };
    
    let formattedData = `useGetMyChallenges: ${JSON.stringify(summary)}\n`;
    
    // Log all challenges with their status
    const allChallenges = [
      ...activeChallenges.map((challenge: any) => ({ ...challenge, status: 'active' })),
      ...completedChallenges.map((challenge: any) => ({ ...challenge, status: 'completed' })),
      ...failedChallenges.map((challenge: any) => ({ ...challenge, status: 'failed' }))
    ];
    
    allChallenges.forEach((challenge: any) => {
      const length = challenge.userChallenge.challenge.length;
      const daysCompleted = challenge.userChallenge.days_completed;
      const startedAt = new Date(challenge.userChallenge.started_at).toLocaleDateString();
      const endsAt = challenge.userChallenge.ends_at ? new Date(challenge.userChallenge.ends_at).toLocaleDateString() : 'N/A';
      const completedAt = challenge.userChallenge.completed_at ? new Date(challenge.userChallenge.completed_at).toLocaleDateString() : 'N/A';
      
      if (challenge.status === 'active') {
        // Active challenge formatting
        const daysLeft = challenge.progress ? challenge.progress.daysRemaining : 'N/A';
        const daysUntilNextBadge = challenge.progress?.daysUntilNextBadge || 'N/A';
        formattedData += `  - ${challenge.userChallenge.challenge.title} (${challenge.status}), Progress: ${challenge.progress?.progressLabel || 'N/A'}, Days Left: ${daysLeft}, Days Until Next Badge: ${daysUntilNextBadge}\n`;
        formattedData += `    Started: ${startedAt} | Ends: ${endsAt}\n`;
      } else {
        // Completed challenge formatting
        formattedData += `  - ${challenge.userChallenge.challenge.title} (${challenge.status}), ${daysCompleted}/${length}\n`;
        formattedData += `    Started: ${startedAt} | Ended: ${endsAt} | Completed: ${completedAt}\n`;
      }
      // Badges, Friends, and Pictures
      const friendsCount = challenge.friendsCompleted?.length || 0;
      const picturesCount = challenge.pictures?.length || 0;
      formattedData += `    Badges: ${JSON.stringify(challenge.badgesEarned || [])} | Friends Completed: ${friendsCount} | Pictures: ${picturesCount}\n`;
    });
    
    console.log(formattedData);
  }
  
  return {
    activeChallenges: data?.getUserChallenges?.activeChallenges || [],
    completedChallenges: data?.getUserChallenges?.completedChallenges || [],
    failedChallenges: data?.getUserChallenges?.failedChallenges || [],
    success: data?.getUserChallenges?.success || false,
    errors: data?.getUserChallenges?.errors || [],
    fetched: fetched,
    error: error?.message || null
  };
}

export const GET_CHALLENGE_DAY_MEDIA = gql`
  query GetChallengeDayMedia($userChallengeId: Int!) {
    getChallengeDayMedia(userChallengeId: $userChallengeId) {
      success
      entries {
        day_number
        mediaUrls
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetChallengeDayMedia(userChallengeId: number, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_CHALLENGE_DAY_MEDIA, {
    variables: { userChallengeId },
    skip: !hasFetched,
  });

  const fetched = hasFetched && !loading;

  if (debugQueries && fetched) {
    console.log("useGetChallengeDayMedia data", data, error ? "error:" + error : "");
  }

  return {
    entries: data?.getChallengeDayMedia?.entries || [],
    success: data?.getChallengeDayMedia?.success || false,
    errors: data?.getChallengeDayMedia?.errors || [],
    fetched,
    error: error?.message || null,
  };
}

export const GET_FRIENDS_IN_CHALLENGE = gql`
  query GetFriendsInChallenge($challengeId: Int!, $status: ChallengeStatus!) {
    getFriendsInChallenge(challengeId: $challengeId, status: $status) {
      success
      friends {
        id
        username
        first_name
        last_name
        days_completed
        status
        badge_level
        profile_picture
      }
      errors {
        field
        message
      }
    }
  }
`;

// Hook for usage in components
export function useGetFriendsInChallenge(challengeId: number, status: string, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_FRIENDS_IN_CHALLENGE, {
    variables: { challengeId, status },
    skip: !hasFetched
  });

  return {
    friends: data?.getFriendsInChallenge?.friends || [],
    success: data?.getFriendsInChallenge?.success || false,
    errors: data?.getFriendsInChallenge?.errors || [],
    loading,
    error: error?.message || null
  };
}
