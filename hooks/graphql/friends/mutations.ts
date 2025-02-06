import { gql, useMutation } from '@apollo/client';


// Mutation - Send Friend Request
// input: sender_id/receiver_id
export const SEND_FRIEND_REQUEST = gql`
    mutation ($input: CreateFriendshipInput!) {
        createFriendship(input: $input) {
            success
            friendship {
                user { id first_name last_name }
                friend { id first_name last_name }
                status
            }
            errors { field message }
        }
    }
`;

// Mutation - Accept Friend Request
//mutation ($userId: Int!, $friendId: Int!, $input: UpdateFriendshipInput!) { updateFriendship(user_id: $userId, friend_id: $friendId, input: $input) { success friendship { user {id first_name last_name } friend {id first_name last_name } status } errors { field message } } }
export const ACCEPT_FRIEND_REQUEST = gql`
    mutation ($userId: Int!, $friendId: Int!, $input: UpdateFriendshipInput!) {
        updateFriendship(user_id: $userId, friend_id: $friendId, input: $input) {
            success
            friendship {
                user {
                    id
                    first_name
                    last_name
                }
                friend {
                    id
                    first_name
                    last_name
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

// Mutation - Delete Friendship
//"query": "mutation($userId: Int!, $friendId: Int!) { deleteFriendship(user_id: $userId, friend_id: $friendId) { success errors { field message } } }",

export const DELETE_FRIENDSHIP = gql`
    mutation ($userId: Int!, $friendId: Int!) {
        deleteFriendship(user_id: $userId, friend_id: $friendId) {
            success
            errors {
                field
                message
            }
        }
    }
`;