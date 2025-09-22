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
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetExploreChallenges(category?: string, hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_EXPLORE_CHALLENGES, {
    variables: { category: category || null },
    skip: !hasFetched
  });
  
  const fetched = hasFetched && !loading;
  
  if (debugQueries && fetched) {
    console.log("useGetExploreChallenges data", data, error ? 'error:' + error : '');
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
        badgesEarned
        friendsCompleted {
          id
          username
          first_name
          last_name
        }
        pictures
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
      errors {
        field
        message
      }
    }
  }
`;

export function useGetMyChallenges(hasFetched: boolean = true) {
  const { data, loading, error } = useQuery(GET_MY_CHALLENGES, {
    skip: !hasFetched
  });
  
  const fetched = hasFetched && !loading;
  
  if (debugQueries && fetched) {
    const activeChallenges = data?.getUserChallenges?.activeChallenges || [];
    const completedChallenges = data?.getUserChallenges?.completedChallenges || [];
    const activeCount = activeChallenges.length;
    const completedCount = completedChallenges.length;
    
    // Summary line
    const summary = {
      success: data?.getUserChallenges?.success || false,
      errors: data?.getUserChallenges?.errors || null,
      activeCount,
      completedCount
    };
    
    let formattedData = `useGetMyChallenges: ${JSON.stringify(summary)}\n`;
    
    // Log all challenges with their status
    const allChallenges = [
      ...activeChallenges.map((challenge: any) => ({ ...challenge, status: 'active' })),
      ...completedChallenges.map((challenge: any) => ({ ...challenge, status: 'completed' }))
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
    success: data?.getUserChallenges?.success || false,
    errors: data?.getUserChallenges?.errors || [],
    fetched: fetched,
    error: error?.message || null
  };
}



