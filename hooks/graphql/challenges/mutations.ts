import { gql, useMutation } from '@apollo/client';
import { debugMutations } from '@/debug/utils';

// Mutation - Join Challenge
export const JOIN_CHALLENGE = gql`
  mutation JoinChallenge($challengeId: Int!) {
    joinChallenge(challengeId: $challengeId) {
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

export function useJoinChallenge() {
  const [joinChallenge, { loading, error }] = useMutation(JOIN_CHALLENGE, {
    onCompleted: (data) => {
      if (debugMutations) {
        console.log("useJoinChallenge completed", data);
      }
    },
    onError: (error) => {
      if (debugMutations) {
        console.log("useJoinChallenge error", error);
      }
    }
  });

  const executeJoinChallenge = async (challengeId: number) => {
    try {
      const result = await joinChallenge({
        variables: { challengeId }
      });
      
      return {
        success: result.data?.joinChallenge?.success || false,
        challenges: result.data?.joinChallenge?.challenges || [],
        errors: result.data?.joinChallenge?.errors || [],
        error: null
      };
    } catch (err: any) {
      return {
        success: false,
        challenges: [],
        errors: [],
        error: err.message
      };
    }
  };

  return {
    joinChallenge: executeJoinChallenge,
    loading,
    error: error?.message || null
  };
}
