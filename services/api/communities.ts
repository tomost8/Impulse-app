import { gql } from '@apollo/client';

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