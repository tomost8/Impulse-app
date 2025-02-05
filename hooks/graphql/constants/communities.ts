import { gql } from '@apollo/client';

// Query - Get User Communities by User ID
export const GET_USER_COMMUNITIES = gql`
    query ($userId: Int!) {
        getUserCommunities(id: $userId) {
            success
            community_members {
                community {
                    id
                    name
                }
                role
                status
            }
            errors {
                field
                message
            }
        }
    }
`;

export const GET_COMMUNITIES = gql`
  query {
    getAllCommunities {
      communities {
        id
        name
        description
        thumbnail
        influencer {
          id
          first_name
          last_name
          email
        }
      }
    }
  }
`;

export const GET_COMMUNITY = gql`
  query ($id: Int!) {
    getCommunity(id: $id) {
      success
      community {
        id
        name
        description
        thumbnail
        influencer {
          id
          first_name
          last_name
          email
        }
      }
    }
  }
`; 