import { gql } from '@apollo/client';

// Query - Get Rewards
//"query": "query { getRewards { success rewards { id title description required_points } errors { field message } } }"

export const GET_REWARDS = gql`
    query {
        getRewards {
            success
            rewards {
                id
                title
                description
                required_points
            }
        }
    }
`;

// Query - Redeem Reward (Create Redeem)
//{"query": "mutation ($input: CreateRedeemInput!){ createRedeem(input: $input) { success redeem { user { id first_name last_name } reward { id title required_points } points_spent status  } errors { field message } } }",  
export const REDEEM_REWARD = gql`
    mutation ($input: CreateRedeemInput!) {
        createRedeem(input: $input) {
            success
            redeem {
                user {
                    id
                    first_name
                    last_name
                }
                reward {
                    id
                    title
                    required_points
                }
                points_spent
                status
            }
            errors {
                field
                message
            }
        }
    }
`;