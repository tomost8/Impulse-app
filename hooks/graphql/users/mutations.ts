import { gql, useMutation } from '@apollo/client';

// Mutation - Update User
export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      user {
        id
        email
        first_name
        last_name
        username
        gender
        age
        status
        profile_picture
        bio
        primary_goal
        secondary_goal
        timezone
        role
      }
      errors {
        field
        message
      }
    }
  }
`;

/*
Inputs=
@Field(() => String, { nullable: true })
@IsOptional()
@Length(1, 100, { message: 'First name must be between 1 and 100 characters' })
first_name?: string;

@Field(() => String, { nullable: true })
@IsOptional()
@Length(1, 100, { message: 'Last name must be between 1 and 100 characters' })
last_name?: string;

@Field(() => String, { nullable: true })
@IsOptional()
@Length(2, 100, { message: 'Username must be between 2 and 100 characters' })
username?: string;

@Field(() => DateScalar, { nullable: true })
@IsOptional()
dob?: Date;

@Field(() => String, { nullable: true })
@IsOptional()
gender?: string;

@Field(() => String, { nullable: true })
@IsOptional()
profile_picture?: string;

@Field(() => String, { nullable: true })
@IsOptional()
bio?: string;

@Field(() => Category, { nullable: true })
@IsOptional()
primary_goal?: Category;

@Field(() => Category, { nullable: true })
@IsOptional()
secondary_goal?: Category;

@Field(() => String, { nullable: true })
@IsOptional()
timezone?: string;

/** Whether the user should be searchable *
@Field(() => Boolean, { nullable: true })
@IsOptional()
searchable?: boolean;

@Field(() => String, { nullable: true })
@IsOptional()
fcm_token?: string;

/** User's new role *
@Field(() => String, { nullable: true })
@IsOptional()
@Length(1, 50, { message: 'Role must be between 1 and 50 characters' })
role?: string;

/** User's status *
@Field(() => String, { nullable: true })
@IsOptional()
@Length(1, 50, { message: 'Status must be between 1 and 50 characters' })
status?: string;
*/
export function useUpdateUser() {
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const updateUser = async (input: any, authToken: string) => {
    try {
      const response = await updateUserMutation({ 
        variables: { 
          input: input 
        },
        context: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
      return response.data.updateUser;
    } catch (error) {
      console.error('Update User failed:', error);
      throw error;
    }
  };
  return { updateUser };
}