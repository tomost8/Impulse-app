import { gql, useQuery } from '@apollo/client';

// Variables: 
const GET_POSTS_BY_USER_ID = gql`
  query($userId: Int!, $skip: Int, $take: Int) {
    postsByUserId(userId: $userId, skip: $skip, take: $take) {
      success
      posts {
        id
        caption
        category
        author {
          id
          first_name
          last_name
        }
        post_targets {
          id
          target_type
          target_id
        }
      }
      errors {
        field
        message
      }
    }
  }
`;