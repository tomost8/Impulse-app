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