import { gql, useMutation } from '@apollo/client';

// Mutation - Create Redeem
export const CREATE_REDEEM = gql`
  mutation ($input: CreateRedeemInput!) {
    createRedeem(input: $input) {
      success
      redeem {
        user { id first_name last_name }
        reward { id title required_points }
        points_spent
        status
      }
      errors { field message }
    }
  }
`;

export function useCreateRedeem() {
  const [createRedeemMutation] = useMutation(CREATE_REDEEM);
  const createRedeem = async (user_id: number, reward_id: number) => {
    try {
      const response = await createRedeemMutation({ variables: { 
        input: { user_id, reward_id } 
      } });
      return response.data.createRedeem;
    } catch (error) {
      console.error('Redemption failed:', error);
      throw error;
    }
  };
  return { createRedeem };
}