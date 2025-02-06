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

/* Input:
  user_id: number
  reward_id: number
*/
export function useCreateRedeem() {
  const [createRedeemMutation] = useMutation(CREATE_REDEEM);
  const createRedeem = async (input: any) => {
    try {
      const response = await createRedeemMutation({ 
        variables: { 
          input: input
        }
      });
      return response.data.createRedeem;
    } catch (error) {
      console.error('Create Redeem failed:', error);
      throw error;
    }
  };
  return { createRedeem };
}