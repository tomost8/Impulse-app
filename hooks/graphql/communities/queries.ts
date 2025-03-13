import { gql, useQuery } from '@apollo/client';
import { debugQueries } from '@/utils/debug';

// Query - Get All Communities
export const GET_COMMUNITIES = gql`
  query {
    getAllCommunities {
      success
      communities {
        id
        name
        thumbnail
        influencer {
          id
          first_name
          last_name
          email
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetCommunities(shouldFetch: boolean = true) {
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

// Query - Get All Categories
export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      success
      community_categories {
        community_id
        category
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetAllCategories(shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES, {
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetAllCategories data", data, error ? 'error:' + error : '');
  }
  return {
    categories: data?.getAllCategories.community_categories || [],
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
          profile_picture
          bio
        }
      }
    }
  }
`; 

export function useGetCommunity(id: number, shouldFetch: boolean = true) {
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

// Query - Get Community Members (by Community ID)
export const GET_COMMUNITY_MEMBERS = gql`
  query ($communityId: Int!) {
    getCommunityMembers(id: $communityId) {
      success
      community_members {
        user { id first_name last_name username profile_picture }
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

export function useGetCommunityMembers(communityId: number, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_COMMUNITY_MEMBERS, {
    variables: { communityId },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetCommunityMembers data", data, error ? 'error:' + error : '');
  }
  return {
    communityMembers: data?.getCommunityMembers.community_members || [],
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
          thumbnail
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

// Query - Get Category Communities (by Category)
export const GET_CATEGORY_COMMUNITIES = gql`
  query ($category: Category!) {
    getCategoryCommunities(category: $category) {
      success
      community_categories {
        community {
          id
          name
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export function useGetCategoryCommunities(category: string, shouldFetch: boolean = true) {
  const { data, loading, error } = useQuery(GET_CATEGORY_COMMUNITIES, {
    variables: { category },
    skip: !shouldFetch,
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  });
  const fetched = shouldFetch && !loading;
  if (debugQueries && fetched) {
    console.log("useGetCategoryCommunities data", data, error ? 'error:' + error : '');
  }
  return {
    communityCategories: data?.getCategoryCommunities.community_categories || [],
    fetched: fetched,
    error: error?.message || null
  };
}

