import { gql } from '@apollo/client';

//input: first_name, last_name, username, dob, gender, (age?), gender, profile_picture, bio, primary_goal, secondary_goal, timezone
//searchable, fcm_token, role, status
export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      user {
        id
        first_name
        last_name
        username
        gender
        dob
        status
      }
    }
  }
`;