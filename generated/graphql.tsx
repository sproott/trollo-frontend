import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
  description?: Maybe<Scalars["String"]>
  index: Scalars["Int"]
  assignee?: Maybe<User>
  list: List
}

export type List = {
  __typename?: "List"
  id: Scalars["ID"]
  name: Scalars["String"]
  index: Scalars["Int"]
  cards: Array<Card>
  board: Board
}

export type Board = {
  __typename?: "Board"
  id: Scalars["ID"]
  name: Scalars["String"]
  lists: Array<List>
  team: Team
  isOwn: Scalars["Boolean"]
}

export type Team = {
  __typename?: "Team"
  id: Scalars["ID"]
  name: Scalars["String"]
  boards: Array<Board>
  participants: Array<Participant>
}

export type Participant = {
  __typename?: "Participant"
  user: User
  team: Team
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  username: Scalars["String"]
  email: Scalars["String"]
  owns: Array<Participant>
  participatesIn: Array<Participant>
  is_admin: Scalars["Boolean"]
}

export type CreateBoardResponse = {
  __typename?: "CreateBoardResponse"
  board?: Maybe<Board>
  exists?: Maybe<Scalars["Boolean"]>
}

export type RenameResponse = {
  __typename?: "RenameResponse"
  success?: Maybe<Scalars["Boolean"]>
  exists?: Maybe<Scalars["Boolean"]>
}

export type CreateCardResponse = {
  __typename?: "CreateCardResponse"
  card?: Maybe<Card>
  exists?: Maybe<Scalars["Boolean"]>
}

export type CreateListResponse = {
  __typename?: "CreateListResponse"
  list?: Maybe<List>
  exists?: Maybe<Scalars["Boolean"]>
}

export type CreateTeamResponse = {
  __typename?: "CreateTeamResponse"
  team?: Maybe<Team>
  exists?: Maybe<Scalars["Boolean"]>
}

export type AddUserResponse = {
  __typename?: "AddUserResponse"
  userId?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
  alreadyInTeam?: Maybe<Scalars["Boolean"]>
  doesNotExist?: Maybe<Scalars["Boolean"]>
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
  board: Board
  nextIndex: Scalars["Int"]
  user: User
  currentUser?: Maybe<User>
  users: Array<User>
}

export type QueryBoardArgs = {
  id: Scalars["String"]
}

export type QueryNextIndexArgs = {
  listId: Scalars["String"]
}

export type QueryUserArgs = {
  id: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createBoard: CreateBoardResponse
  renameBoard: RenameResponse
  deleteBoard: Scalars["Boolean"]
  createCard: CreateCardResponse
  moveCard: Scalars["Boolean"]
  renameCard: RenameResponse
  updateCardDescription: Scalars["Boolean"]
  deleteCard: Scalars["Boolean"]
  assignUser: Scalars["Boolean"]
  unassignUser: Scalars["Boolean"]
  createList: CreateListResponse
  moveList: Scalars["Boolean"]
  renameList: RenameResponse
  deleteList: Scalars["Boolean"]
  createTeam: CreateTeamResponse
  deleteTeam: Scalars["Boolean"]
  renameTeam: RenameResponse
  addUser: AddUserResponse
  removeUser: Scalars["Boolean"]
  leaveTeam: Scalars["Boolean"]
  login: User
  logout?: Maybe<Scalars["Boolean"]>
  register: RegisterResponse
  makeAdmin: Scalars["Boolean"]
}

export type MutationCreateBoardArgs = {
  name: Scalars["String"]
  teamId: Scalars["String"]
}

export type MutationRenameBoardArgs = {
  name: Scalars["String"]
  boardId: Scalars["String"]
}

export type MutationDeleteBoardArgs = {
  id: Scalars["String"]
}

export type MutationCreateCardArgs = {
  listId: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  name: Scalars["String"]
}

export type MutationMoveCardArgs = {
  destinationIndex: Scalars["Int"]
  listId?: Maybe<Scalars["String"]>
  cardId: Scalars["String"]
}

export type MutationRenameCardArgs = {
  name: Scalars["String"]
  cardId: Scalars["String"]
}

export type MutationUpdateCardDescriptionArgs = {
  description: Scalars["String"]
  cardId: Scalars["String"]
}

export type MutationDeleteCardArgs = {
  id: Scalars["String"]
}

export type MutationAssignUserArgs = {
  userId: Scalars["String"]
  cardId: Scalars["String"]
}

export type MutationUnassignUserArgs = {
  cardId: Scalars["String"]
}

export type MutationCreateListArgs = {
  boardId: Scalars["String"]
  name: Scalars["String"]
}

export type MutationMoveListArgs = {
  destinationIndex: Scalars["Int"]
  listId: Scalars["String"]
}

export type MutationRenameListArgs = {
  name: Scalars["String"]
  listId: Scalars["String"]
}

export type MutationDeleteListArgs = {
  id: Scalars["String"]
}

export type MutationCreateTeamArgs = {
  name: Scalars["String"]
}

export type MutationDeleteTeamArgs = {
  id: Scalars["String"]
}

export type MutationRenameTeamArgs = {
  name: Scalars["String"]
  teamId: Scalars["String"]
}

export type MutationAddUserArgs = {
  username: Scalars["String"]
  teamId: Scalars["String"]
}

export type MutationRemoveUserArgs = {
  teamId: Scalars["String"]
  userId: Scalars["String"]
}

export type MutationLeaveTeamArgs = {
  teamId: Scalars["String"]
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

export type TeamsQueryBoardFragment = { __typename?: "Board" } & Pick<Board, "id" | "name">

export type CreateBoardMutationVariables = Exact<{
  teamId: Scalars["String"]
  name: Scalars["String"]
}>

export type CreateBoardMutation = { __typename?: "Mutation" } & {
  createBoard: { __typename?: "CreateBoardResponse" } & Pick<CreateBoardResponse, "exists"> & {
      board?: Maybe<{ __typename?: "Board" } & Pick<Board, "id" | "name">>
    }
}

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteBoardMutation = { __typename?: "Mutation" } & Pick<Mutation, "deleteBoard">

export type RenameBoardMutationVariables = Exact<{
  name: Scalars["String"]
  boardId: Scalars["String"]
}>

export type RenameBoardMutation = { __typename?: "Mutation" } & {
  renameBoard: { __typename?: "RenameResponse" } & Pick<RenameResponse, "success" | "exists">
}

export type BoardQueryVariables = Exact<{
  id: Scalars["String"]
}>

export type BoardQuery = { __typename?: "Query" } & {
  board: { __typename?: "Board" } & Pick<Board, "id" | "name" | "isOwn"> & {
      lists: Array<{ __typename?: "List" } & BoardQueryListFragment>
      team: { __typename?: "Team" } & BoardQueryTeamFragment
    }
}

export type BoardQueryCardFragment = { __typename?: "Card" } & Pick<
  Card,
  "id" | "name" | "description" | "index"
> & {
    assignee?: Maybe<{ __typename?: "User" } & UserInfoFragment>
  }

export type AssignUserMutationVariables = Exact<{
  userId: Scalars["String"]
  cardId: Scalars["String"]
}>

export type AssignUserMutation = { __typename?: "Mutation" } & Pick<Mutation, "assignUser">

export type UpdateCardDescriptionMutationVariables = Exact<{
  description: Scalars["String"]
  cardId: Scalars["String"]
}>

export type UpdateCardDescriptionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateCardDescription"
>

export type CreateCardMutationVariables = Exact<{
  listId: Scalars["String"]
  name: Scalars["String"]
  description?: Maybe<Scalars["String"]>
}>

export type CreateCardMutation = { __typename?: "Mutation" } & {
  createCard: { __typename?: "CreateCardResponse" } & Pick<CreateCardResponse, "exists"> & {
      card?: Maybe<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "description" | "index">>
    }
}

export type DeleteCardMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteCardMutation = { __typename?: "Mutation" } & Pick<Mutation, "deleteCard">

export type MoveCardMutationVariables = Exact<{
  destinationIndex: Scalars["Int"]
  listId?: Maybe<Scalars["String"]>
  cardId: Scalars["String"]
}>

export type MoveCardMutation = { __typename?: "Mutation" } & Pick<Mutation, "moveCard">

export type RenameCardMutationVariables = Exact<{
  name: Scalars["String"]
  cardId: Scalars["String"]
}>

export type RenameCardMutation = { __typename?: "Mutation" } & {
  renameCard: { __typename?: "RenameResponse" } & Pick<RenameResponse, "success" | "exists">
}

export type UnassignUserMutationVariables = Exact<{
  cardId: Scalars["String"]
}>

export type UnassignUserMutation = { __typename?: "Mutation" } & Pick<Mutation, "unassignUser">

export type BoardQueryListFragment = { __typename?: "List" } & Pick<
  List,
  "id" | "name" | "index"
> & {
    cards: Array<{ __typename?: "Card" } & BoardQueryCardFragment>
  }

export type CreateListMutationVariables = Exact<{
  boardId: Scalars["String"]
  name: Scalars["String"]
}>

export type CreateListMutation = { __typename?: "Mutation" } & {
  createList: { __typename?: "CreateListResponse" } & Pick<CreateListResponse, "exists"> & {
      list?: Maybe<{ __typename?: "List" } & Pick<List, "id" | "name">>
    }
}

export type DeleteListMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteListMutation = { __typename?: "Mutation" } & Pick<Mutation, "deleteList">

export type MoveListMutationVariables = Exact<{
  destinationIndex: Scalars["Int"]
  listId: Scalars["String"]
}>

export type MoveListMutation = { __typename?: "Mutation" } & Pick<Mutation, "moveList">

export type RenameListMutationVariables = Exact<{
  name: Scalars["String"]
  listId: Scalars["String"]
}>

export type RenameListMutation = { __typename?: "Mutation" } & {
  renameList: { __typename?: "RenameResponse" } & Pick<RenameResponse, "success" | "exists">
}

export type ParticipantTeamFragment = { __typename?: "Participant" } & {
  team: { __typename?: "Team" } & TeamsQueryTeamFragment
}

export type ParticipantUserFragment = { __typename?: "Participant" } & {
  user: { __typename?: "User" } & UserInfoFragment
}

export type BoardQueryTeamFragment = { __typename?: "Team" } & Pick<Team, "id"> & {
    participants: Array<{ __typename?: "Participant" } & ParticipantUserFragment>
  }

export type TeamsQueryTeamFragment = { __typename?: "Team" } & Pick<Team, "id" | "name"> & {
    boards: Array<{ __typename?: "Board" } & TeamsQueryBoardFragment>
    participants: Array<{ __typename?: "Participant" } & ParticipantUserFragment>
  }

export type AddUserMutationVariables = Exact<{
  username: Scalars["String"]
  teamId: Scalars["String"]
}>

export type AddUserMutation = { __typename?: "Mutation" } & {
  addUser: { __typename?: "AddUserResponse" } & Pick<
    AddUserResponse,
    "userId" | "username" | "alreadyInTeam" | "doesNotExist"
  >
}

export type CreateTeamMutationVariables = Exact<{
  name: Scalars["String"]
}>

export type CreateTeamMutation = { __typename?: "Mutation" } & {
  createTeam: { __typename?: "CreateTeamResponse" } & Pick<CreateTeamResponse, "exists"> & {
      team?: Maybe<{ __typename?: "Team" } & Pick<Team, "id" | "name">>
    }
}

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteTeamMutation = { __typename?: "Mutation" } & Pick<Mutation, "deleteTeam">

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars["String"]
}>

export type LeaveTeamMutation = { __typename?: "Mutation" } & Pick<Mutation, "leaveTeam">

export type RemoveUserMutationVariables = Exact<{
  teamId: Scalars["String"]
  userId: Scalars["String"]
}>

export type RemoveUserMutation = { __typename?: "Mutation" } & Pick<Mutation, "removeUser">

export type RenameTeamMutationVariables = Exact<{
  name: Scalars["String"]
  teamId: Scalars["String"]
}>

export type RenameTeamMutation = { __typename?: "Mutation" } & {
  renameTeam: { __typename?: "RenameResponse" } & Pick<RenameResponse, "success" | "exists">
}

export type UserInfoFragment = { __typename?: "User" } & Pick<User, "id" | "username">

export type UserTeamsInfoFragment = { __typename?: "User" } & Pick<User, "id"> & {
    owns: Array<{ __typename?: "Participant" } & ParticipantTeamFragment>
    participatesIn: Array<{ __typename?: "Participant" } & ParticipantTeamFragment>
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>
}

export type TeamsQueryVariables = Exact<{ [key: string]: never }>

export type TeamsQuery = { __typename?: "Query" } & {
  currentUser?: Maybe<{ __typename?: "User" } & UserTeamsInfoFragment>
}

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
  }
`
export const BoardQueryCardFragmentDoc = gql`
  fragment BoardQueryCard on Card {
    id
    name
    description
    assignee {
      ...UserInfo
    }
    index
  }
  ${UserInfoFragmentDoc}
`
export const BoardQueryListFragmentDoc = gql`
  fragment BoardQueryList on List {
    id
    name
    index
    cards {
      ...BoardQueryCard
    }
  }
  ${BoardQueryCardFragmentDoc}
`
export const ParticipantUserFragmentDoc = gql`
  fragment ParticipantUser on Participant {
    user {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`
export const BoardQueryTeamFragmentDoc = gql`
  fragment BoardQueryTeam on Team {
    id
    participants {
      ...ParticipantUser
    }
  }
  ${ParticipantUserFragmentDoc}
`
export const TeamsQueryBoardFragmentDoc = gql`
  fragment TeamsQueryBoard on Board {
    id
    name
  }
`
export const TeamsQueryTeamFragmentDoc = gql`
  fragment TeamsQueryTeam on Team {
    id
    name
    boards {
      ...TeamsQueryBoard
    }
    participants {
      ...ParticipantUser
    }
  }
  ${TeamsQueryBoardFragmentDoc}
  ${ParticipantUserFragmentDoc}
`
export const ParticipantTeamFragmentDoc = gql`
  fragment ParticipantTeam on Participant {
    team {
      ...TeamsQueryTeam
    }
  }
  ${TeamsQueryTeamFragmentDoc}
`
export const UserTeamsInfoFragmentDoc = gql`
  fragment UserTeamsInfo on User {
    id
    owns {
      ...ParticipantTeam
    }
    participatesIn {
      ...ParticipantTeam
    }
  }
  ${ParticipantTeamFragmentDoc}
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
export const DeleteBoardDocument = gql`
  mutation DeleteBoard($id: String!) {
    deleteBoard(id: $id)
  }
`
export type DeleteBoardMutationFn = Apollo.MutationFunction<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>
) {
  return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    DeleteBoardDocument,
    baseOptions
  )
}

export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>
export const RenameBoardDocument = gql`
  mutation RenameBoard($name: String!, $boardId: String!) {
    renameBoard(name: $name, boardId: $boardId) {
      success
      exists
    }
  }
`
export type RenameBoardMutationFn = Apollo.MutationFunction<
  RenameBoardMutation,
  RenameBoardMutationVariables
>

/**
 * __useRenameBoardMutation__
 *
 * To run a mutation, you first call `useRenameBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameBoardMutation, { data, loading, error }] = useRenameBoardMutation({
 *   variables: {
 *      name: // value for 'name'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useRenameBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<RenameBoardMutation, RenameBoardMutationVariables>
) {
  return Apollo.useMutation<RenameBoardMutation, RenameBoardMutationVariables>(
    RenameBoardDocument,
    baseOptions
  )
}

export type RenameBoardMutationHookResult = ReturnType<typeof useRenameBoardMutation>
export type RenameBoardMutationResult = Apollo.MutationResult<RenameBoardMutation>
export type RenameBoardMutationOptions = Apollo.BaseMutationOptions<
  RenameBoardMutation,
  RenameBoardMutationVariables
>
export const BoardDocument = gql`
  query Board($id: String!) {
    board(id: $id) {
      id
      name
      isOwn
      lists {
        ...BoardQueryList
      }
      team {
        ...BoardQueryTeam
      }
    }
  }
  ${BoardQueryListFragmentDoc}
  ${BoardQueryTeamFragmentDoc}
`

/**
 * __useBoardQuery__
 *
 * To run a query within a React component, call `useBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBoardQuery(
  baseOptions: Apollo.QueryHookOptions<BoardQuery, BoardQueryVariables>
) {
  return Apollo.useQuery<BoardQuery, BoardQueryVariables>(BoardDocument, baseOptions)
}

export function useBoardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BoardQuery, BoardQueryVariables>
) {
  return Apollo.useLazyQuery<BoardQuery, BoardQueryVariables>(BoardDocument, baseOptions)
}

export type BoardQueryHookResult = ReturnType<typeof useBoardQuery>
export type BoardLazyQueryHookResult = ReturnType<typeof useBoardLazyQuery>
export type BoardQueryResult = Apollo.QueryResult<BoardQuery, BoardQueryVariables>
export const AssignUserDocument = gql`
  mutation AssignUser($userId: String!, $cardId: String!) {
    assignUser(userId: $userId, cardId: $cardId)
  }
`
export type AssignUserMutationFn = Apollo.MutationFunction<
  AssignUserMutation,
  AssignUserMutationVariables
>

/**
 * __useAssignUserMutation__
 *
 * To run a mutation, you first call `useAssignUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUserMutation, { data, loading, error }] = useAssignUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useAssignUserMutation(
  baseOptions?: Apollo.MutationHookOptions<AssignUserMutation, AssignUserMutationVariables>
) {
  return Apollo.useMutation<AssignUserMutation, AssignUserMutationVariables>(
    AssignUserDocument,
    baseOptions
  )
}

export type AssignUserMutationHookResult = ReturnType<typeof useAssignUserMutation>
export type AssignUserMutationResult = Apollo.MutationResult<AssignUserMutation>
export type AssignUserMutationOptions = Apollo.BaseMutationOptions<
  AssignUserMutation,
  AssignUserMutationVariables
>
export const UpdateCardDescriptionDocument = gql`
  mutation UpdateCardDescription($description: String!, $cardId: String!) {
    updateCardDescription(description: $description, cardId: $cardId)
  }
`
export type UpdateCardDescriptionMutationFn = Apollo.MutationFunction<
  UpdateCardDescriptionMutation,
  UpdateCardDescriptionMutationVariables
>

/**
 * __useUpdateCardDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateCardDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardDescriptionMutation, { data, loading, error }] = useUpdateCardDescriptionMutation({
 *   variables: {
 *      description: // value for 'description'
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useUpdateCardDescriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCardDescriptionMutation,
    UpdateCardDescriptionMutationVariables
  >
) {
  return Apollo.useMutation<UpdateCardDescriptionMutation, UpdateCardDescriptionMutationVariables>(
    UpdateCardDescriptionDocument,
    baseOptions
  )
}

export type UpdateCardDescriptionMutationHookResult = ReturnType<
  typeof useUpdateCardDescriptionMutation
>
export type UpdateCardDescriptionMutationResult = Apollo.MutationResult<UpdateCardDescriptionMutation>
export type UpdateCardDescriptionMutationOptions = Apollo.BaseMutationOptions<
  UpdateCardDescriptionMutation,
  UpdateCardDescriptionMutationVariables
>
export const CreateCardDocument = gql`
  mutation createCard($listId: String!, $name: String!, $description: String) {
    createCard(listId: $listId, name: $name, description: $description) {
      card {
        id
        name
        description
        index
      }
      exists
    }
  }
`
export type CreateCardMutationFn = Apollo.MutationFunction<
  CreateCardMutation,
  CreateCardMutationVariables
>

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateCardMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>
) {
  return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(
    CreateCardDocument,
    baseOptions
  )
}

export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<
  CreateCardMutation,
  CreateCardMutationVariables
>
export const DeleteCardDocument = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id)
  }
`
export type DeleteCardMutationFn = Apollo.MutationFunction<
  DeleteCardMutation,
  DeleteCardMutationVariables
>

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCardMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>
) {
  return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(
    DeleteCardDocument,
    baseOptions
  )
}

export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<
  DeleteCardMutation,
  DeleteCardMutationVariables
>
export const MoveCardDocument = gql`
  mutation MoveCard($destinationIndex: Int!, $listId: String, $cardId: String!) {
    moveCard(destinationIndex: $destinationIndex, listId: $listId, cardId: $cardId)
  }
`
export type MoveCardMutationFn = Apollo.MutationFunction<
  MoveCardMutation,
  MoveCardMutationVariables
>

/**
 * __useMoveCardMutation__
 *
 * To run a mutation, you first call `useMoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCardMutation, { data, loading, error }] = useMoveCardMutation({
 *   variables: {
 *      destinationIndex: // value for 'destinationIndex'
 *      listId: // value for 'listId'
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useMoveCardMutation(
  baseOptions?: Apollo.MutationHookOptions<MoveCardMutation, MoveCardMutationVariables>
) {
  return Apollo.useMutation<MoveCardMutation, MoveCardMutationVariables>(
    MoveCardDocument,
    baseOptions
  )
}

export type MoveCardMutationHookResult = ReturnType<typeof useMoveCardMutation>
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<
  MoveCardMutation,
  MoveCardMutationVariables
>
export const RenameCardDocument = gql`
  mutation RenameCard($name: String!, $cardId: String!) {
    renameCard(name: $name, cardId: $cardId) {
      success
      exists
    }
  }
`
export type RenameCardMutationFn = Apollo.MutationFunction<
  RenameCardMutation,
  RenameCardMutationVariables
>

/**
 * __useRenameCardMutation__
 *
 * To run a mutation, you first call `useRenameCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameCardMutation, { data, loading, error }] = useRenameCardMutation({
 *   variables: {
 *      name: // value for 'name'
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useRenameCardMutation(
  baseOptions?: Apollo.MutationHookOptions<RenameCardMutation, RenameCardMutationVariables>
) {
  return Apollo.useMutation<RenameCardMutation, RenameCardMutationVariables>(
    RenameCardDocument,
    baseOptions
  )
}

export type RenameCardMutationHookResult = ReturnType<typeof useRenameCardMutation>
export type RenameCardMutationResult = Apollo.MutationResult<RenameCardMutation>
export type RenameCardMutationOptions = Apollo.BaseMutationOptions<
  RenameCardMutation,
  RenameCardMutationVariables
>
export const UnassignUserDocument = gql`
  mutation UnassignUser($cardId: String!) {
    unassignUser(cardId: $cardId)
  }
`
export type UnassignUserMutationFn = Apollo.MutationFunction<
  UnassignUserMutation,
  UnassignUserMutationVariables
>

/**
 * __useUnassignUserMutation__
 *
 * To run a mutation, you first call `useUnassignUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignUserMutation, { data, loading, error }] = useUnassignUserMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useUnassignUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UnassignUserMutation, UnassignUserMutationVariables>
) {
  return Apollo.useMutation<UnassignUserMutation, UnassignUserMutationVariables>(
    UnassignUserDocument,
    baseOptions
  )
}

export type UnassignUserMutationHookResult = ReturnType<typeof useUnassignUserMutation>
export type UnassignUserMutationResult = Apollo.MutationResult<UnassignUserMutation>
export type UnassignUserMutationOptions = Apollo.BaseMutationOptions<
  UnassignUserMutation,
  UnassignUserMutationVariables
>
export const CreateListDocument = gql`
  mutation createList($boardId: String!, $name: String!) {
    createList(boardId: $boardId, name: $name) {
      list {
        id
        name
      }
      exists
    }
  }
`
export type CreateListMutationFn = Apollo.MutationFunction<
  CreateListMutation,
  CreateListMutationVariables
>

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateListMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>
) {
  return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(
    CreateListDocument,
    baseOptions
  )
}

export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>
export type CreateListMutationOptions = Apollo.BaseMutationOptions<
  CreateListMutation,
  CreateListMutationVariables
>
export const DeleteListDocument = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id)
  }
`
export type DeleteListMutationFn = Apollo.MutationFunction<
  DeleteListMutation,
  DeleteListMutationVariables
>

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteListMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>
) {
  return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(
    DeleteListDocument,
    baseOptions
  )
}

export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<
  DeleteListMutation,
  DeleteListMutationVariables
>
export const MoveListDocument = gql`
  mutation MoveList($destinationIndex: Int!, $listId: String!) {
    moveList(destinationIndex: $destinationIndex, listId: $listId)
  }
`
export type MoveListMutationFn = Apollo.MutationFunction<
  MoveListMutation,
  MoveListMutationVariables
>

/**
 * __useMoveListMutation__
 *
 * To run a mutation, you first call `useMoveListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveListMutation, { data, loading, error }] = useMoveListMutation({
 *   variables: {
 *      destinationIndex: // value for 'destinationIndex'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useMoveListMutation(
  baseOptions?: Apollo.MutationHookOptions<MoveListMutation, MoveListMutationVariables>
) {
  return Apollo.useMutation<MoveListMutation, MoveListMutationVariables>(
    MoveListDocument,
    baseOptions
  )
}

export type MoveListMutationHookResult = ReturnType<typeof useMoveListMutation>
export type MoveListMutationResult = Apollo.MutationResult<MoveListMutation>
export type MoveListMutationOptions = Apollo.BaseMutationOptions<
  MoveListMutation,
  MoveListMutationVariables
>
export const RenameListDocument = gql`
  mutation RenameList($name: String!, $listId: String!) {
    renameList(name: $name, listId: $listId) {
      success
      exists
    }
  }
`
export type RenameListMutationFn = Apollo.MutationFunction<
  RenameListMutation,
  RenameListMutationVariables
>

/**
 * __useRenameListMutation__
 *
 * To run a mutation, you first call `useRenameListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameListMutation, { data, loading, error }] = useRenameListMutation({
 *   variables: {
 *      name: // value for 'name'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useRenameListMutation(
  baseOptions?: Apollo.MutationHookOptions<RenameListMutation, RenameListMutationVariables>
) {
  return Apollo.useMutation<RenameListMutation, RenameListMutationVariables>(
    RenameListDocument,
    baseOptions
  )
}

export type RenameListMutationHookResult = ReturnType<typeof useRenameListMutation>
export type RenameListMutationResult = Apollo.MutationResult<RenameListMutation>
export type RenameListMutationOptions = Apollo.BaseMutationOptions<
  RenameListMutation,
  RenameListMutationVariables
>
export const AddUserDocument = gql`
  mutation AddUser($username: String!, $teamId: String!) {
    addUser(username: $username, teamId: $teamId) {
      userId
      username
      alreadyInTeam
      doesNotExist
    }
  }
`
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>
) {
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, baseOptions)
}

export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
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
export const DeleteTeamDocument = gql`
  mutation DeleteTeam($id: String!) {
    deleteTeam(id: $id)
  }
`
export type DeleteTeamMutationFn = Apollo.MutationFunction<
  DeleteTeamMutation,
  DeleteTeamMutationVariables
>

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>
) {
  return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(
    DeleteTeamDocument,
    baseOptions
  )
}

export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<
  DeleteTeamMutation,
  DeleteTeamMutationVariables
>
export const LeaveTeamDocument = gql`
  mutation LeaveTeam($teamId: String!) {
    leaveTeam(teamId: $teamId)
  }
`
export type LeaveTeamMutationFn = Apollo.MutationFunction<
  LeaveTeamMutation,
  LeaveTeamMutationVariables
>

/**
 * __useLeaveTeamMutation__
 *
 * To run a mutation, you first call `useLeaveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveTeamMutation, { data, loading, error }] = useLeaveTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLeaveTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<LeaveTeamMutation, LeaveTeamMutationVariables>
) {
  return Apollo.useMutation<LeaveTeamMutation, LeaveTeamMutationVariables>(
    LeaveTeamDocument,
    baseOptions
  )
}

export type LeaveTeamMutationHookResult = ReturnType<typeof useLeaveTeamMutation>
export type LeaveTeamMutationResult = Apollo.MutationResult<LeaveTeamMutation>
export type LeaveTeamMutationOptions = Apollo.BaseMutationOptions<
  LeaveTeamMutation,
  LeaveTeamMutationVariables
>
export const RemoveUserDocument = gql`
  mutation RemoveUser($teamId: String!, $userId: String!) {
    removeUser(teamId: $teamId, userId: $userId)
  }
`
export type RemoveUserMutationFn = Apollo.MutationFunction<
  RemoveUserMutation,
  RemoveUserMutationVariables
>

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>
) {
  return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(
    RemoveUserDocument,
    baseOptions
  )
}

export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveUserMutation,
  RemoveUserMutationVariables
>
export const RenameTeamDocument = gql`
  mutation RenameTeam($name: String!, $teamId: String!) {
    renameTeam(name: $name, teamId: $teamId) {
      success
      exists
    }
  }
`
export type RenameTeamMutationFn = Apollo.MutationFunction<
  RenameTeamMutation,
  RenameTeamMutationVariables
>

/**
 * __useRenameTeamMutation__
 *
 * To run a mutation, you first call `useRenameTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameTeamMutation, { data, loading, error }] = useRenameTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useRenameTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<RenameTeamMutation, RenameTeamMutationVariables>
) {
  return Apollo.useMutation<RenameTeamMutation, RenameTeamMutationVariables>(
    RenameTeamDocument,
    baseOptions
  )
}

export type RenameTeamMutationHookResult = ReturnType<typeof useRenameTeamMutation>
export type RenameTeamMutationResult = Apollo.MutationResult<RenameTeamMutation>
export type RenameTeamMutationOptions = Apollo.BaseMutationOptions<
  RenameTeamMutation,
  RenameTeamMutationVariables
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
export const TeamsDocument = gql`
  query Teams {
    currentUser {
      ...UserTeamsInfo
    }
  }
  ${UserTeamsInfoFragmentDoc}
`

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(
  baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>
) {
  return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions)
}

export function useTeamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>
) {
  return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions)
}

export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>
