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
        profile_picture
        role
        status
        timezone
        searchable
        last_login_at
      }
      errors {
        field
        message
      }
    }
  }
`; 

//"query": "query ($id: Int!){ getPoint(id: $id) { success point { user { id first_name last_name } points spending_points weekly_points monthly_points } errors { field message } } }",  
export const GET_POINTS = gql`
  query ($id: Int!) {
    getPoint(id: $id) {
      success
      point {
        user {
          id
          first_name
          last_name
        }
        points
        spending_points
        weekly_points
        monthly_points
      }
    }
  }
`;