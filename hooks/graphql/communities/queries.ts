import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';
const debug = debugQueries;

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

export function getUserCommunities(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_USER_COMMUNITIES, {
    variables: { userId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  //console.log(data);
  return {
    communityMembers: data?.getUserCommunities.community_members || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function getCommunities(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITIES, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  //console.log(data);

  return {
    communities: data?.getAllCommunities.communities || [],
    isLoading: loading,
    error: error?.message || null
  };
} 

export function getCommunity(id: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITY, {
    variables: { id },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });

  return {
    community: data?.getCommunity.community || [],
    isLoading: loading,
    error: error?.message || null
  };
} 