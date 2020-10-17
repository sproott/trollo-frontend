import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Card = {
  __typename?: "Card"
  id: Scalars["ID"]
  name: Scalars["String"]
}

export type List = {
  __typename?: "List"
  id: Scalars["ID"]
  name: Scalars["String"]
  cards?: Maybe<Array<Card>>
}

export type Board = {
  __typename?: "Board"
  id: Scalars["ID"]
  name: Scalars["String"]
  lists?: Maybe<Array<List>>
}

export type Team = {
  __typename?: "Team"
  id: Scalars["ID"]
  name: Scalars["String"]
  admin: User
  boards?: Maybe<Array<Board>>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  username: Scalars["String"]
  email: Scalars["String"]
  ownTeams?: Maybe<Array<Team>>
  teams?: Maybe<Array<Team>>
  isAdmin: Scalars["Boolean"]
}

export type HelloWorld = {
  __typename?: "HelloWorld"
  greeting: Scalars["String"]
}

export type CreateBoardResponse = {
  __typename?: "CreateBoardResponse"
  board?: Maybe<Board>
  exists?: Maybe<Scalars["Boolean"]>
}

export type CreateTeamResponse = {
  __typename?: "CreateTeamResponse"
  team?: Maybe<Team>
  exists?: Maybe<Scalars["Boolean"]>
}

export type RegisterError = {
  __typename?: "RegisterError"
  email?: Maybe<Scalars["Boolean"]>
  username?: Maybe<Scalars["Boolean"]>
}

export type RegisterResponse = {
  __typename?: "RegisterResponse"
  user?: Maybe<User>
  error?: Maybe<RegisterError>
}

export type RegisterInput = {
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type LoginInput = {
  usernameOrEmail: Scalars["String"]
  password: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  greeting: HelloWorld
  user: User
  currentUser?: Maybe<User>
  users: Array<User>
}

export type QueryGreetingArgs = {
  name?: Maybe<Scalars["String"]>
}

export type QueryUserArgs = {
  id: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createBoard: CreateBoardResponse
  deleteBoard?: Maybe<Scalars["Boolean"]>
  createTeam: CreateTeamResponse
  deleteTeam?: Maybe<Scalars["Boolean"]>
  login: User
  logout?: Maybe<Scalars["Boolean"]>
  register: RegisterResponse
  makeAdmin: Scalars["Boolean"]
}

export type MutationCreateBoardArgs = {
  name: Scalars["String"]
  teamId: Scalars["String"]
}

export type MutationDeleteBoardArgs = {
  id: Scalars["String"]
}

export type MutationCreateTeamArgs = {
  name: Scalars["String"]
}

export type MutationDeleteTeamArgs = {
  id: Scalars["String"]
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationMakeAdminArgs = {
  username: Scalars["String"]
}

export type CreateBoardMutationVariables = Exact<{
  teamId: Scalars["String"]
  name: Scalars["String"]
}>

export type CreateBoardMutation = { __typename?: "Mutation" } & {
  createBoard: { __typename?: "CreateBoardResponse" } & Pick<CreateBoardResponse, "exists"> & {
      board?: Maybe<{ __typename?: "Board" } & Pick<Board, "id" | "name">>
    }
}

export type CreateTeamMutationVariables = Exact<{
  name: Scalars["String"]
}>

export type CreateTeamMutation = { __typename?: "Mutation" } & {
  createTeam: { __typename?: "CreateTeamResponse" } & Pick<CreateTeamResponse, "exists"> & {
      team?: Maybe<{ __typename?: "Team" } & Pick<Team, "id" | "name">>
    }
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "id" | "username" | "email">
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation" } & Pick<Mutation, "logout">

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "RegisterResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username" | "email">>
    error?: Maybe<{ __typename?: "RegisterError" } & Pick<RegisterError, "username" | "email">>
  }
}

export type TeamInfoFragment = { __typename?: "Team" } & Pick<Team, "id" | "name"> & {
    boards?: Maybe<Array<{ __typename?: "Board" } & Pick<Board, "id" | "name">>>
  }

export type BoardsQueryVariables = Exact<{ [key: string]: never }>

export type BoardsQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        ownTeams?: Maybe<Array<{ __typename?: "Team" } & TeamInfoFragment>>
        teams?: Maybe<Array<{ __typename?: "Team" } & TeamInfoFragment>>
      }
  >
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>
}

export const TeamInfoFragmentDoc = gql`
  fragment TeamInfo on Team {
    id
    name
    boards {
      id
      name
    }
  }
`
export const CreateBoardDocument = gql`
  mutation CreateBoard($teamId: String!, $name: String!) {
    createBoard(teamId: $teamId, name: $name) {
      board {
        id
        name
      }
      exists
    }
  }
`
export type CreateBoardMutationFn = Apollo.MutationFunction<
  CreateBoardMutation,
  CreateBoardMutationVariables
>

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>
) {
  return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument,
    baseOptions
  )
}

export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<
  CreateBoardMutation,
  CreateBoardMutationVariables
>
export const CreateTeamDocument = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      team {
        id
        name
      }
      exists
    }
  }
`
export type CreateTeamMutationFn = Apollo.MutationFunction<
  CreateTeamMutation,
  CreateTeamMutationVariables
>

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>
) {
  return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(
    CreateTeamDocument,
    baseOptions
  )
}

export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<
  CreateTeamMutation,
  CreateTeamMutationVariables
>
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      email
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}

export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions)
}

export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        username
        email
      }
      error {
        username
        email
      }
    }
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  )
}

export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const BoardsDocument = gql`
  query Boards {
    currentUser {
      id
      ownTeams {
        ...TeamInfo
      }
      teams {
        ...TeamInfo
      }
    }
  }
  ${TeamInfoFragmentDoc}
`

/**
 * __useBoardsQuery__
 *
 * To run a query within a React component, call `useBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBoardsQuery(
  baseOptions?: Apollo.QueryHookOptions<BoardsQuery, BoardsQueryVariables>
) {
  return Apollo.useQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, baseOptions)
}

export function useBoardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BoardsQuery, BoardsQueryVariables>
) {
  return Apollo.useLazyQuery<BoardsQuery, BoardsQueryVariables>(BoardsDocument, baseOptions)
}

export type BoardsQueryHookResult = ReturnType<typeof useBoardsQuery>
export type BoardsLazyQueryHookResult = ReturnType<typeof useBoardsLazyQuery>
export type BoardsQueryResult = Apollo.QueryResult<BoardsQuery, BoardsQueryVariables>
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  )
}

export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  )
}

export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
