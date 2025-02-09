import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/constants/debug';

// Query - Get All Communities
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

export function getCommunities(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITIES, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetCommunities data", data, error ? 'error:' + error : '');
  }
  return {
    communities: data?.getAllCommunities.communities || [],
    fetched: fetched,
    error: error?.message || null
  };
} 

// Query - Get Community (by Community ID)
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

export function getCommunity(id: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITY, {
    variables: { id },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetCommunity data", data, error ? 'error:' + error : '');
  }
  return {
    community: data?.getCommunity.community || [],
    fetched: fetched,
    error: error?.message || null
  };
} 

// Query - Get User Communities (by User ID)
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

export function useGetUserCommunities(userId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_USER_COMMUNITIES, {
    variables: { userId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetUserCommunities data", data, error ? 'error:' + error : '');
  }
  return {
    communityMembers: data?.getUserCommunities.community_members || [],
    fetched: fetched,
    error: error?.message || null
  };
} 



