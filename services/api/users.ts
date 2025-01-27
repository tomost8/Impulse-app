import { gql } from '@apollo/client';

//query($id: Int!) { user(id: $id) { success user { username profile_picture} errors { field message } } }
//success user { id email firebase_uid first_name last_name username gender profile_picture role status timezone searchable last_login_at } errors { field message } } }",
export const GET_USER = gql`
  query ($id: Int!) {
    user(id: $id) {
      success
      user {
        id
        email
        firebase_uid
        first_name
        last_name
        username
        dob
        gender
        bio
        primary_goal
        secondary_goal
        profile_picture
        role
        status
        timezone
        searchable
        last_login_at
        point {
          points
          spending_points
          weekly_points
          monthly_points
        }
      }
      errors {
        field
        message
      }
    }
  }
`; 

export const GET_USERS_LEADERBOARD = gql`
  query ($sort_by: UserSortType!) {
    users(sort_by: $sort_by) {
      success
      users {
        id
        firebase_uid
        first_name
        last_name
        username
        profile_picture
        point {
          points
          spending_points
          weekly_points
          monthly_points
        }
      }
      errors {
        field
        message
      }
    }
  }
`; 

//should be somewhat deprecated now that i moved points to return in user table
export const GET_POINTS = gql`
  query ($id: Int!) {
    getPoint(id: $id) {
      success
      point {
        points
        spending_points
        weekly_points
        monthly_points
      }
    }
  }
`;