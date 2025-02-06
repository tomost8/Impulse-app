import { gql } from '@apollo/client';

// Query - Get Friends by User ID
export const GET_FRIENDS = gql`
    query ($userId: Int!) {
        getFriendships(id: $userId) {
            success
            friendships {
                friend {
                    id
                    first_name
                    last_name
                    username
                    profile_picture
                    email
                    point {
                        points
                        spending_points
                        weekly_points
                        monthly_points
                    }
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

// Query - Get Friends by User ID with Sorting for Leaderboard
export const GET_FRIENDS_SORTING = gql`
    query ($userId: Int!, $sortBy: UserSortType!) {
        getFriendships(id: $userId, sort_by: $sortBy) {
            success
            friendships {
                friend {
                    id
                    username
                    profile_picture
                    point {
                        points
                        spending_points
                        weekly_points
                        monthly_points
                    }
                }
            }
            errors {
                field
                message
            }
        }
    }
`;

// Query - Get Friends Requests by User ID
export const GET_FRIEND_REQUESTS = gql`
    query ($userId: Int!, $role: String!) {
        getFriendRequests(id: $userId, role: $role) {
            success
            friendships {
                friend {
                    id
                    first_name
                    last_name
                    email
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