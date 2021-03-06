import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Flair = {
  __typename?: 'Flair';
  id: Scalars['ID'];
  name: Scalars['String'];
  hue: Scalars['Float'];
  team: Team;
  cards: Array<Card>;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  index: Scalars['Int'];
  assignee?: Maybe<User>;
  list: List;
  flairs: Array<Flair>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID'];
  name: Scalars['String'];
  index: Scalars['Int'];
  cards: Array<Card>;
  board: Board;
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['ID'];
  name: Scalars['String'];
  lists: Array<List>;
  team: Team;
  isOwn: Scalars['Boolean'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  boards: Array<Board>;
  participants: Array<Participant>;
  flairs: Array<Flair>;
};

export type Participant = {
  __typename?: 'Participant';
  user: User;
  team: Team;
  owner: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  owns: Array<Participant>;
  participatesIn: Array<Participant>;
  is_admin: Scalars['Boolean'];
};

export type CreateBoardResponse = {
  __typename?: 'CreateBoardResponse';
  board?: Maybe<Board>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type RenameResponse = {
  __typename?: 'RenameResponse';
  success?: Maybe<Scalars['Boolean']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type BoardCreatedPayload = {
  __typename?: 'BoardCreatedPayload';
  teamId: Scalars['String'];
  board: Board;
};

export type CreateCardResponse = {
  __typename?: 'CreateCardResponse';
  card?: Maybe<Card>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type CardCreatedPayload = {
  __typename?: 'CardCreatedPayload';
  card: Card;
  listId: Scalars['String'];
  boardId: Scalars['String'];
};

export type CardMovedPayload = {
  __typename?: 'CardMovedPayload';
  card: Card;
  destinationListId: Scalars['String'];
  sourceIndex: Scalars['Float'];
  destinationIndex: Scalars['Float'];
  boardId: Scalars['String'];
};

export type CardUserAssignedPayload = {
  __typename?: 'CardUserAssignedPayload';
  cardId: Scalars['String'];
  boardId: Scalars['String'];
  user: User;
};

export type CardIdBoardIdPayload = {
  __typename?: 'CardIdBoardIdPayload';
  cardId: Scalars['String'];
  boardId: Scalars['String'];
};

export type CreateFlairResponse = {
  __typename?: 'CreateFlairResponse';
  flair?: Maybe<Flair>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FlairTeamIdPayload = {
  __typename?: 'FlairTeamIdPayload';
  flair: Flair;
  teamId: Scalars['String'];
};

export type FlairIdTeamIdPayload = {
  __typename?: 'FlairIdTeamIdPayload';
  flairId: Scalars['String'];
  teamId: Scalars['String'];
};

export type FlairIdCardIdTeamIdPayload = {
  __typename?: 'FlairIdCardIdTeamIdPayload';
  flairId: Scalars['String'];
  cardId: Scalars['String'];
  teamId: Scalars['String'];
};

export type JoinUsingInviteResponse = {
  __typename?: 'JoinUsingInviteResponse';
  team?: Maybe<Team>;
  alreadyInTeam?: Maybe<Scalars['Boolean']>;
};

export type CreateListResponse = {
  __typename?: 'CreateListResponse';
  list?: Maybe<List>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type ListMovedPayload = {
  __typename?: 'ListMovedPayload';
  list: List;
  sourceIndex: Scalars['Float'];
  destinationIndex: Scalars['Float'];
};

export type CreateTeamResponse = {
  __typename?: 'CreateTeamResponse';
  team?: Maybe<Team>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type AddUserResponse = {
  __typename?: 'AddUserResponse';
  userId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  alreadyInTeam?: Maybe<Scalars['Boolean']>;
  doesNotExist?: Maybe<Scalars['Boolean']>;
};

export type TeamUserAddedPayload = {
  __typename?: 'TeamUserAddedPayload';
  team: Team;
  user: User;
};

export type TeamUserRemovedPayload = {
  __typename?: 'TeamUserRemovedPayload';
  teamId: Scalars['String'];
  userId: Scalars['String'];
};

export type RegisterError = {
  __typename?: 'RegisterError';
  email?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['Boolean']>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user?: Maybe<User>;
  error?: Maybe<RegisterError>;
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  board: Board;
  nextIndex: Scalars['Int'];
  inviteIntervals: Array<Scalars['String']>;
  user: User;
  currentUser?: Maybe<User>;
  users: Array<User>;
};


export type QueryBoardArgs = {
  id: Scalars['ID'];
};


export type QueryNextIndexArgs = {
  listId: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: CreateBoardResponse;
  renameBoard: RenameResponse;
  deleteBoard: Scalars['Boolean'];
  createCard: CreateCardResponse;
  moveCard: Scalars['Boolean'];
  renameCard: RenameResponse;
  updateCardDescription: Scalars['Boolean'];
  deleteCard: Scalars['Boolean'];
  assignUser: Scalars['Boolean'];
  unassignUser: Scalars['Boolean'];
  createFlair: CreateFlairResponse;
  changeFlairHue: Scalars['Boolean'];
  renameFlair: RenameResponse;
  deleteFlair: Scalars['Boolean'];
  assignFlair: Scalars['Boolean'];
  unassignFlair: Scalars['Boolean'];
  generateInvite: Scalars['String'];
  joinUsingInvite: JoinUsingInviteResponse;
  createList: CreateListResponse;
  moveList: Scalars['Boolean'];
  renameList: RenameResponse;
  deleteList: Scalars['Boolean'];
  createTeam: CreateTeamResponse;
  deleteTeam: Scalars['Boolean'];
  renameTeam: RenameResponse;
  addUser: AddUserResponse;
  removeUser: Scalars['Boolean'];
  leaveTeam: Scalars['Boolean'];
  login: User;
  logout?: Maybe<Scalars['Boolean']>;
  register: RegisterResponse;
  makeAdmin: Scalars['Boolean'];
};


export type MutationCreateBoardArgs = {
  name: Scalars['String'];
  teamId: Scalars['ID'];
};


export type MutationRenameBoardArgs = {
  name: Scalars['String'];
  boardId: Scalars['ID'];
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCardArgs = {
  listId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationMoveCardArgs = {
  destinationIndex: Scalars['Int'];
  listId?: Maybe<Scalars['ID']>;
  cardId: Scalars['ID'];
};


export type MutationRenameCardArgs = {
  name: Scalars['String'];
  cardId: Scalars['ID'];
};


export type MutationUpdateCardDescriptionArgs = {
  description: Scalars['String'];
  cardId: Scalars['ID'];
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID'];
};


export type MutationAssignUserArgs = {
  userId: Scalars['ID'];
  cardId: Scalars['ID'];
};


export type MutationUnassignUserArgs = {
  cardId: Scalars['ID'];
};


export type MutationCreateFlairArgs = {
  name: Scalars['String'];
  hue: Scalars['Int'];
  teamId: Scalars['ID'];
};


export type MutationChangeFlairHueArgs = {
  hue: Scalars['Int'];
  flairId: Scalars['ID'];
};


export type MutationRenameFlairArgs = {
  name: Scalars['String'];
  flairId: Scalars['ID'];
};


export type MutationDeleteFlairArgs = {
  flairId: Scalars['ID'];
};


export type MutationAssignFlairArgs = {
  flairId: Scalars['ID'];
  cardId: Scalars['ID'];
};


export type MutationUnassignFlairArgs = {
  flairId: Scalars['ID'];
  cardId: Scalars['ID'];
};


export type MutationGenerateInviteArgs = {
  expiration: Scalars['String'];
  teamId: Scalars['ID'];
};


export type MutationJoinUsingInviteArgs = {
  token: Scalars['String'];
};


export type MutationCreateListArgs = {
  boardId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationMoveListArgs = {
  destinationIndex: Scalars['Int'];
  listId: Scalars['ID'];
};


export type MutationRenameListArgs = {
  name: Scalars['String'];
  listId: Scalars['ID'];
};


export type MutationDeleteListArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID'];
};


export type MutationRenameTeamArgs = {
  name: Scalars['String'];
  teamId: Scalars['ID'];
};


export type MutationAddUserArgs = {
  username: Scalars['String'];
  teamId: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationMakeAdminArgs = {
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  boardCreated: BoardCreatedPayload;
  boardRenamed: Board;
  boardDeleted: Scalars['String'];
  cardCreated: CardCreatedPayload;
  cardMoved: CardMovedPayload;
  cardUpdated: Card;
  cardDeleted: CardIdBoardIdPayload;
  cardUserAssigned: CardUserAssignedPayload;
  cardUserUnassigned: CardIdBoardIdPayload;
  flairCreated: Flair;
  flairUpdated: Flair;
  flairDeleted: FlairIdTeamIdPayload;
  flairAssigned: FlairIdCardIdTeamIdPayload;
  flairUnassigned: FlairIdCardIdTeamIdPayload;
  listCreated: List;
  listMoved: ListMovedPayload;
  listRenamed: List;
  listDeleted: Scalars['String'];
  teamDeleted: Scalars['String'];
  teamRenamed: Team;
  teamUserAdded: TeamUserAddedPayload;
  teamUserRemoved: TeamUserRemovedPayload;
};


export type SubscriptionBoardRenamedArgs = {
  boardId?: Maybe<Scalars['ID']>;
};


export type SubscriptionBoardDeletedArgs = {
  boardId?: Maybe<Scalars['ID']>;
};


export type SubscriptionCardCreatedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionCardMovedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionCardUpdatedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionCardDeletedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionCardUserAssignedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionCardUserUnassignedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionFlairCreatedArgs = {
  teamId: Scalars['ID'];
};


export type SubscriptionFlairUpdatedArgs = {
  teamId: Scalars['ID'];
};


export type SubscriptionFlairDeletedArgs = {
  teamId: Scalars['ID'];
};


export type SubscriptionFlairAssignedArgs = {
  teamId: Scalars['ID'];
};


export type SubscriptionFlairUnassignedArgs = {
  teamId: Scalars['ID'];
};


export type SubscriptionListCreatedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionListMovedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionListRenamedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionListDeletedArgs = {
  boardId: Scalars['ID'];
};


export type SubscriptionTeamUserAddedArgs = {
  teamId?: Maybe<Scalars['ID']>;
};


export type SubscriptionTeamUserRemovedArgs = {
  teamId?: Maybe<Scalars['ID']>;
};

export type TeamsQueryBoardFragment = (
  { __typename?: 'Board' }
  & Pick<Board, 'id' | 'name'>
);

export type BoardQueryBoardFragment = (
  { __typename?: 'Board' }
  & Pick<Board, 'id' | 'name' | 'isOwn'>
  & { lists: Array<(
    { __typename?: 'List' }
    & BoardQueryListFragment
  )>, team: (
    { __typename?: 'Team' }
    & BoardQueryTeamFragment
  ) }
);

export type CreateBoardMutationVariables = Exact<{
  teamId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type CreateBoardMutation = (
  { __typename?: 'Mutation' }
  & { createBoard: (
    { __typename?: 'CreateBoardResponse' }
    & Pick<CreateBoardResponse, 'exists'>
    & { board?: Maybe<(
      { __typename?: 'Board' }
      & Pick<Board, 'id' | 'name'>
    )> }
  ) }
);

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBoardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBoard'>
);

export type RenameBoardMutationVariables = Exact<{
  name: Scalars['String'];
  boardId: Scalars['ID'];
}>;


export type RenameBoardMutation = (
  { __typename?: 'Mutation' }
  & { renameBoard: (
    { __typename?: 'RenameResponse' }
    & Pick<RenameResponse, 'success' | 'exists'>
  ) }
);

export type BoardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BoardQuery = (
  { __typename?: 'Query' }
  & { board: (
    { __typename?: 'Board' }
    & BoardQueryBoardFragment
  ) }
);

export type BoardCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BoardCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { boardCreated: (
    { __typename?: 'BoardCreatedPayload' }
    & Pick<BoardCreatedPayload, 'teamId'>
    & { board: (
      { __typename?: 'Board' }
      & Pick<Board, 'id' | 'name' | 'isOwn'>
    ) }
  ) }
);

export type BoardRenamedSubscriptionVariables = Exact<{
  boardId?: Maybe<Scalars['ID']>;
}>;


export type BoardRenamedSubscription = (
  { __typename?: 'Subscription' }
  & { boardRenamed: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'name' | 'isOwn'>
  ) }
);

export type BoardDeletedSubscriptionVariables = Exact<{
  boardId?: Maybe<Scalars['ID']>;
}>;


export type BoardDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'boardDeleted'>
);

export type BoardQueryCardFragment = (
  { __typename?: 'Card' }
  & Pick<Card, 'id' | 'name' | 'description' | 'index'>
  & { assignee?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )>, flairs: Array<(
    { __typename?: 'Flair' }
    & FlairInfoFragment
  )> }
);

export type UpdateCardDescriptionMutationVariables = Exact<{
  description: Scalars['String'];
  cardId: Scalars['ID'];
}>;


export type UpdateCardDescriptionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCardDescription'>
);

export type CreateCardMutationVariables = Exact<{
  listId: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}>;


export type CreateCardMutation = (
  { __typename?: 'Mutation' }
  & { createCard: (
    { __typename?: 'CreateCardResponse' }
    & Pick<CreateCardResponse, 'exists'>
    & { card?: Maybe<(
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'description' | 'index'>
    )> }
  ) }
);

export type DeleteCardMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCard'>
);

export type MoveCardMutationVariables = Exact<{
  destinationIndex: Scalars['Int'];
  listId?: Maybe<Scalars['ID']>;
  cardId: Scalars['ID'];
}>;


export type MoveCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveCard'>
);

export type RenameCardMutationVariables = Exact<{
  name: Scalars['String'];
  cardId: Scalars['ID'];
}>;


export type RenameCardMutation = (
  { __typename?: 'Mutation' }
  & { renameCard: (
    { __typename?: 'RenameResponse' }
    & Pick<RenameResponse, 'success' | 'exists'>
  ) }
);

export type AssignUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  cardId: Scalars['ID'];
}>;


export type AssignUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignUser'>
);

export type UnassignUserMutationVariables = Exact<{
  cardId: Scalars['ID'];
}>;


export type UnassignUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unassignUser'>
);

export type CardCreatedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type CardCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { cardCreated: (
    { __typename?: 'CardCreatedPayload' }
    & Pick<CardCreatedPayload, 'listId'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'name' | 'description'>
    ) }
  ) }
);

export type CardMovedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type CardMovedSubscription = (
  { __typename?: 'Subscription' }
  & { cardMoved: (
    { __typename?: 'CardMovedPayload' }
    & Pick<CardMovedPayload, 'sourceIndex' | 'destinationIndex' | 'destinationListId'>
    & { card: (
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'index'>
    ) }
  ) }
);

export type CardUpdatedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type CardUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { cardUpdated: (
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'name' | 'description'>
  ) }
);

export type CardDeletedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type CardDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { cardDeleted: (
    { __typename?: 'CardIdBoardIdPayload' }
    & Pick<CardIdBoardIdPayload, 'cardId'>
  ) }
);

export type CardUserAssignedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type CardUserAssignedSubscription = (
  { __typename?: 'Subscription' }
  & { cardUserAssigned: (
    { __typename?: 'CardUserAssignedPayload' }
    & Pick<CardUserAssignedPayload, 'cardId' | 'boardId'>
    & { user: (
      { __typename?: 'User' }
      & UserInfoFragment
    ) }
  ) }
);

export type CardUserUnassignedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type CardUserUnassignedSubscription = (
  { __typename?: 'Subscription' }
  & { cardUserUnassigned: (
    { __typename?: 'CardIdBoardIdPayload' }
    & Pick<CardIdBoardIdPayload, 'cardId'>
  ) }
);

export type FlairInfoFragment = (
  { __typename?: 'Flair' }
  & Pick<Flair, 'id' | 'name' | 'hue'>
);

export type CreateFlairMutationVariables = Exact<{
  teamId: Scalars['ID'];
  name: Scalars['String'];
  hue: Scalars['Int'];
}>;


export type CreateFlairMutation = (
  { __typename?: 'Mutation' }
  & { createFlair: (
    { __typename?: 'CreateFlairResponse' }
    & Pick<CreateFlairResponse, 'exists'>
    & { flair?: Maybe<(
      { __typename?: 'Flair' }
      & FlairInfoFragment
    )> }
  ) }
);

export type ChangeFlairHueMutationVariables = Exact<{
  flairId: Scalars['ID'];
  hue: Scalars['Int'];
}>;


export type ChangeFlairHueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeFlairHue'>
);

export type RenameFlairMutationVariables = Exact<{
  flairId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type RenameFlairMutation = (
  { __typename?: 'Mutation' }
  & { renameFlair: (
    { __typename?: 'RenameResponse' }
    & Pick<RenameResponse, 'success' | 'exists'>
  ) }
);

export type DeleteFlairMutationVariables = Exact<{
  flairId: Scalars['ID'];
}>;


export type DeleteFlairMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFlair'>
);

export type AssignFlairMutationVariables = Exact<{
  cardId: Scalars['ID'];
  flairId: Scalars['ID'];
}>;


export type AssignFlairMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'assignFlair'>
);

export type UnassignFlairMutationVariables = Exact<{
  cardId: Scalars['ID'];
  flairId: Scalars['ID'];
}>;


export type UnassignFlairMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unassignFlair'>
);

export type FlairCreatedSubscriptionVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type FlairCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { flairCreated: (
    { __typename?: 'Flair' }
    & FlairInfoFragment
  ) }
);

export type FlairUpdatedSubscriptionVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type FlairUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { flairUpdated: (
    { __typename?: 'Flair' }
    & FlairInfoFragment
  ) }
);

export type FlairDeletedSubscriptionVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type FlairDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { flairDeleted: (
    { __typename?: 'FlairIdTeamIdPayload' }
    & Pick<FlairIdTeamIdPayload, 'flairId'>
  ) }
);

export type FlairAssignedSubscriptionVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type FlairAssignedSubscription = (
  { __typename?: 'Subscription' }
  & { flairAssigned: (
    { __typename?: 'FlairIdCardIdTeamIdPayload' }
    & Pick<FlairIdCardIdTeamIdPayload, 'flairId' | 'cardId'>
  ) }
);

export type FlairUnassignedSubscriptionVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type FlairUnassignedSubscription = (
  { __typename?: 'Subscription' }
  & { flairUnassigned: (
    { __typename?: 'FlairIdCardIdTeamIdPayload' }
    & Pick<FlairIdCardIdTeamIdPayload, 'flairId' | 'cardId'>
  ) }
);

export type GenerateInviteMutationVariables = Exact<{
  teamId: Scalars['ID'];
  expiration: Scalars['String'];
}>;


export type GenerateInviteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'generateInvite'>
);

export type JoinUsingInviteMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type JoinUsingInviteMutation = (
  { __typename?: 'Mutation' }
  & { joinUsingInvite: (
    { __typename?: 'JoinUsingInviteResponse' }
    & Pick<JoinUsingInviteResponse, 'alreadyInTeam'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & TeamInfoFragment
    )> }
  ) }
);

export type InviteIntervalsQueryVariables = Exact<{ [key: string]: never; }>;


export type InviteIntervalsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'inviteIntervals'>
);

export type BoardQueryListFragment = (
  { __typename?: 'List' }
  & Pick<List, 'id' | 'name' | 'index'>
  & { cards: Array<(
    { __typename?: 'Card' }
    & BoardQueryCardFragment
  )> }
);

export type CreateListMutationVariables = Exact<{
  boardId: Scalars['ID'];
  name: Scalars['String'];
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'CreateListResponse' }
    & Pick<CreateListResponse, 'exists'>
    & { list?: Maybe<(
      { __typename?: 'List' }
      & Pick<List, 'id' | 'name'>
    )> }
  ) }
);

export type DeleteListMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteList'>
);

export type MoveListMutationVariables = Exact<{
  destinationIndex: Scalars['Int'];
  listId: Scalars['ID'];
}>;


export type MoveListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moveList'>
);

export type RenameListMutationVariables = Exact<{
  name: Scalars['String'];
  listId: Scalars['ID'];
}>;


export type RenameListMutation = (
  { __typename?: 'Mutation' }
  & { renameList: (
    { __typename?: 'RenameResponse' }
    & Pick<RenameResponse, 'success' | 'exists'>
  ) }
);

export type ListCreatedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type ListCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { listCreated: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'name' | 'index'>
  ) }
);

export type ListRenamedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type ListRenamedSubscription = (
  { __typename?: 'Subscription' }
  & { listRenamed: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'name'>
  ) }
);

export type ListMovedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type ListMovedSubscription = (
  { __typename?: 'Subscription' }
  & { listMoved: (
    { __typename?: 'ListMovedPayload' }
    & Pick<ListMovedPayload, 'sourceIndex' | 'destinationIndex'>
    & { list: (
      { __typename?: 'List' }
      & Pick<List, 'id' | 'index'>
    ) }
  ) }
);

export type ListDeletedSubscriptionVariables = Exact<{
  boardId: Scalars['ID'];
}>;


export type ListDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'listDeleted'>
);

export type ParticipantTeamFragment = (
  { __typename?: 'Participant' }
  & { team: (
    { __typename?: 'Team' }
    & TeamInfoFragment
  ) }
);

export type ParticipantUserFragment = (
  { __typename?: 'Participant' }
  & Pick<Participant, 'owner'>
  & { user: (
    { __typename?: 'User' }
    & UserInfoFragment
  ) }
);

export type BoardQueryTeamFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name'>
  & { participants: Array<(
    { __typename?: 'Participant' }
    & ParticipantUserFragment
  )>, flairs: Array<(
    { __typename?: 'Flair' }
    & FlairInfoFragment
  )> }
);

export type TeamInfoFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name'>
  & { boards: Array<(
    { __typename?: 'Board' }
    & TeamsQueryBoardFragment
  )>, participants: Array<(
    { __typename?: 'Participant' }
    & ParticipantUserFragment
  )> }
);

export type RemoveUserMutationVariables = Exact<{
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type RemoveUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUser'>
);

export type RenameTeamMutationVariables = Exact<{
  name: Scalars['String'];
  teamId: Scalars['ID'];
}>;


export type RenameTeamMutation = (
  { __typename?: 'Mutation' }
  & { renameTeam: (
    { __typename?: 'RenameResponse' }
    & Pick<RenameResponse, 'success' | 'exists'>
  ) }
);

export type AddUserMutationVariables = Exact<{
  username: Scalars['String'];
  teamId: Scalars['ID'];
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { addUser: (
    { __typename?: 'AddUserResponse' }
    & Pick<AddUserResponse, 'userId' | 'username' | 'alreadyInTeam' | 'doesNotExist'>
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'CreateTeamResponse' }
    & Pick<CreateTeamResponse, 'exists'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
    )> }
  ) }
);

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTeam'>
);

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars['ID'];
}>;


export type LeaveTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveTeam'>
);

export type TeamDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TeamDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'teamDeleted'>
);

export type TeamRenamedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TeamRenamedSubscription = (
  { __typename?: 'Subscription' }
  & { teamRenamed: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type TeamUserAddedSubscriptionVariables = Exact<{
  teamId?: Maybe<Scalars['ID']>;
}>;


export type TeamUserAddedSubscription = (
  { __typename?: 'Subscription' }
  & { teamUserAdded: (
    { __typename?: 'TeamUserAddedPayload' }
    & { team: (
      { __typename?: 'Team' }
      & TeamInfoFragment
    ), user: (
      { __typename?: 'User' }
      & UserInfoFragment
    ) }
  ) }
);

export type TeamUserRemovedSubscriptionVariables = Exact<{
  teamId?: Maybe<Scalars['ID']>;
}>;


export type TeamUserRemovedSubscription = (
  { __typename?: 'Subscription' }
  & { teamUserRemoved: (
    { __typename?: 'TeamUserRemovedPayload' }
    & Pick<TeamUserRemovedPayload, 'teamId' | 'userId'>
  ) }
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type UserTeamsInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
  & { owns: Array<(
    { __typename?: 'Participant' }
    & ParticipantTeamFragment
  )>, participatesIn: Array<(
    { __typename?: 'Participant' }
    & ParticipantTeamFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )>, error?: Maybe<(
      { __typename?: 'RegisterError' }
      & Pick<RegisterError, 'username' | 'email'>
    )> }
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & UserTeamsInfoFragment
  )> }
);

export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  username
}
    `;
export const FlairInfoFragmentDoc = gql`
    fragment FlairInfo on Flair {
  id
  name
  hue
}
    `;
export const BoardQueryCardFragmentDoc = gql`
    fragment BoardQueryCard on Card {
  id
  name
  description
  assignee {
    ...UserInfo
  }
  flairs {
    ...FlairInfo
  }
  index
}
    ${UserInfoFragmentDoc}
${FlairInfoFragmentDoc}`;
export const BoardQueryListFragmentDoc = gql`
    fragment BoardQueryList on List {
  id
  name
  index
  cards {
    ...BoardQueryCard
  }
}
    ${BoardQueryCardFragmentDoc}`;
export const ParticipantUserFragmentDoc = gql`
    fragment ParticipantUser on Participant {
  owner
  user {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const BoardQueryTeamFragmentDoc = gql`
    fragment BoardQueryTeam on Team {
  id
  name
  participants {
    ...ParticipantUser
  }
  flairs {
    ...FlairInfo
  }
}
    ${ParticipantUserFragmentDoc}
${FlairInfoFragmentDoc}`;
export const BoardQueryBoardFragmentDoc = gql`
    fragment BoardQueryBoard on Board {
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
    ${BoardQueryListFragmentDoc}
${BoardQueryTeamFragmentDoc}`;
export const TeamsQueryBoardFragmentDoc = gql`
    fragment TeamsQueryBoard on Board {
  id
  name
}
    `;
export const TeamInfoFragmentDoc = gql`
    fragment TeamInfo on Team {
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
${ParticipantUserFragmentDoc}`;
export const ParticipantTeamFragmentDoc = gql`
    fragment ParticipantTeam on Participant {
  team {
    ...TeamInfo
  }
}
    ${TeamInfoFragmentDoc}`;
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
    ${ParticipantTeamFragmentDoc}`;
export const CreateBoardDocument = gql`
    mutation createBoard($teamId: ID!, $name: String!) {
  createBoard(teamId: $teamId, name: $name) {
    board {
      id
      name
    }
    exists
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

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
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation deleteBoard($id: ID!) {
  deleteBoard(id: $id)
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

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
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const RenameBoardDocument = gql`
    mutation renameBoard($name: String!, $boardId: ID!) {
  renameBoard(name: $name, boardId: $boardId) {
    success
    exists
  }
}
    `;
export type RenameBoardMutationFn = Apollo.MutationFunction<RenameBoardMutation, RenameBoardMutationVariables>;

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
export function useRenameBoardMutation(baseOptions?: Apollo.MutationHookOptions<RenameBoardMutation, RenameBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameBoardMutation, RenameBoardMutationVariables>(RenameBoardDocument, options);
      }
export type RenameBoardMutationHookResult = ReturnType<typeof useRenameBoardMutation>;
export type RenameBoardMutationResult = Apollo.MutationResult<RenameBoardMutation>;
export type RenameBoardMutationOptions = Apollo.BaseMutationOptions<RenameBoardMutation, RenameBoardMutationVariables>;
export const BoardDocument = gql`
    query board($id: ID!) {
  board(id: $id) {
    ...BoardQueryBoard
  }
}
    ${BoardQueryBoardFragmentDoc}`;

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
export function useBoardQuery(baseOptions: Apollo.QueryHookOptions<BoardQuery, BoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardQuery, BoardQueryVariables>(BoardDocument, options);
      }
export function useBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardQuery, BoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardQuery, BoardQueryVariables>(BoardDocument, options);
        }
export type BoardQueryHookResult = ReturnType<typeof useBoardQuery>;
export type BoardLazyQueryHookResult = ReturnType<typeof useBoardLazyQuery>;
export type BoardQueryResult = Apollo.QueryResult<BoardQuery, BoardQueryVariables>;
export const BoardCreatedDocument = gql`
    subscription BoardCreated {
  boardCreated {
    board {
      id
      name
      isOwn
    }
    teamId
  }
}
    `;

/**
 * __useBoardCreatedSubscription__
 *
 * To run a query within a React component, call `useBoardCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBoardCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBoardCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<BoardCreatedSubscription, BoardCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BoardCreatedSubscription, BoardCreatedSubscriptionVariables>(BoardCreatedDocument, options);
      }
export type BoardCreatedSubscriptionHookResult = ReturnType<typeof useBoardCreatedSubscription>;
export type BoardCreatedSubscriptionResult = Apollo.SubscriptionResult<BoardCreatedSubscription>;
export const BoardRenamedDocument = gql`
    subscription boardRenamed($boardId: ID) {
  boardRenamed(boardId: $boardId) {
    id
    name
    isOwn
  }
}
    `;

/**
 * __useBoardRenamedSubscription__
 *
 * To run a query within a React component, call `useBoardRenamedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBoardRenamedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardRenamedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useBoardRenamedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<BoardRenamedSubscription, BoardRenamedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BoardRenamedSubscription, BoardRenamedSubscriptionVariables>(BoardRenamedDocument, options);
      }
export type BoardRenamedSubscriptionHookResult = ReturnType<typeof useBoardRenamedSubscription>;
export type BoardRenamedSubscriptionResult = Apollo.SubscriptionResult<BoardRenamedSubscription>;
export const BoardDeletedDocument = gql`
    subscription boardDeleted($boardId: ID) {
  boardDeleted(boardId: $boardId)
}
    `;

/**
 * __useBoardDeletedSubscription__
 *
 * To run a query within a React component, call `useBoardDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBoardDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardDeletedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useBoardDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<BoardDeletedSubscription, BoardDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BoardDeletedSubscription, BoardDeletedSubscriptionVariables>(BoardDeletedDocument, options);
      }
export type BoardDeletedSubscriptionHookResult = ReturnType<typeof useBoardDeletedSubscription>;
export type BoardDeletedSubscriptionResult = Apollo.SubscriptionResult<BoardDeletedSubscription>;
export const UpdateCardDescriptionDocument = gql`
    mutation updateCardDescription($description: String!, $cardId: ID!) {
  updateCardDescription(description: $description, cardId: $cardId)
}
    `;
export type UpdateCardDescriptionMutationFn = Apollo.MutationFunction<UpdateCardDescriptionMutation, UpdateCardDescriptionMutationVariables>;

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
export function useUpdateCardDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardDescriptionMutation, UpdateCardDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardDescriptionMutation, UpdateCardDescriptionMutationVariables>(UpdateCardDescriptionDocument, options);
      }
export type UpdateCardDescriptionMutationHookResult = ReturnType<typeof useUpdateCardDescriptionMutation>;
export type UpdateCardDescriptionMutationResult = Apollo.MutationResult<UpdateCardDescriptionMutation>;
export type UpdateCardDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateCardDescriptionMutation, UpdateCardDescriptionMutationVariables>;
export const CreateCardDocument = gql`
    mutation createCard($listId: ID!, $name: String!, $description: String) {
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
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

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
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const DeleteCardDocument = gql`
    mutation deleteCard($id: ID!) {
  deleteCard(id: $id)
}
    `;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

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
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const MoveCardDocument = gql`
    mutation moveCard($destinationIndex: Int!, $listId: ID, $cardId: ID!) {
  moveCard(destinationIndex: $destinationIndex, listId: $listId, cardId: $cardId)
}
    `;
export type MoveCardMutationFn = Apollo.MutationFunction<MoveCardMutation, MoveCardMutationVariables>;

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
export function useMoveCardMutation(baseOptions?: Apollo.MutationHookOptions<MoveCardMutation, MoveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveCardMutation, MoveCardMutationVariables>(MoveCardDocument, options);
      }
export type MoveCardMutationHookResult = ReturnType<typeof useMoveCardMutation>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<MoveCardMutation, MoveCardMutationVariables>;
export const RenameCardDocument = gql`
    mutation renameCard($name: String!, $cardId: ID!) {
  renameCard(name: $name, cardId: $cardId) {
    success
    exists
  }
}
    `;
export type RenameCardMutationFn = Apollo.MutationFunction<RenameCardMutation, RenameCardMutationVariables>;

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
export function useRenameCardMutation(baseOptions?: Apollo.MutationHookOptions<RenameCardMutation, RenameCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameCardMutation, RenameCardMutationVariables>(RenameCardDocument, options);
      }
export type RenameCardMutationHookResult = ReturnType<typeof useRenameCardMutation>;
export type RenameCardMutationResult = Apollo.MutationResult<RenameCardMutation>;
export type RenameCardMutationOptions = Apollo.BaseMutationOptions<RenameCardMutation, RenameCardMutationVariables>;
export const AssignUserDocument = gql`
    mutation assignUser($userId: ID!, $cardId: ID!) {
  assignUser(userId: $userId, cardId: $cardId)
}
    `;
export type AssignUserMutationFn = Apollo.MutationFunction<AssignUserMutation, AssignUserMutationVariables>;

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
export function useAssignUserMutation(baseOptions?: Apollo.MutationHookOptions<AssignUserMutation, AssignUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignUserMutation, AssignUserMutationVariables>(AssignUserDocument, options);
      }
export type AssignUserMutationHookResult = ReturnType<typeof useAssignUserMutation>;
export type AssignUserMutationResult = Apollo.MutationResult<AssignUserMutation>;
export type AssignUserMutationOptions = Apollo.BaseMutationOptions<AssignUserMutation, AssignUserMutationVariables>;
export const UnassignUserDocument = gql`
    mutation unassignUser($cardId: ID!) {
  unassignUser(cardId: $cardId)
}
    `;
export type UnassignUserMutationFn = Apollo.MutationFunction<UnassignUserMutation, UnassignUserMutationVariables>;

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
export function useUnassignUserMutation(baseOptions?: Apollo.MutationHookOptions<UnassignUserMutation, UnassignUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignUserMutation, UnassignUserMutationVariables>(UnassignUserDocument, options);
      }
export type UnassignUserMutationHookResult = ReturnType<typeof useUnassignUserMutation>;
export type UnassignUserMutationResult = Apollo.MutationResult<UnassignUserMutation>;
export type UnassignUserMutationOptions = Apollo.BaseMutationOptions<UnassignUserMutation, UnassignUserMutationVariables>;
export const CardCreatedDocument = gql`
    subscription cardCreated($boardId: ID!) {
  cardCreated(boardId: $boardId) {
    card {
      id
      name
      description
    }
    listId
  }
}
    `;

/**
 * __useCardCreatedSubscription__
 *
 * To run a query within a React component, call `useCardCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardCreatedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCardCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CardCreatedSubscription, CardCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CardCreatedSubscription, CardCreatedSubscriptionVariables>(CardCreatedDocument, options);
      }
export type CardCreatedSubscriptionHookResult = ReturnType<typeof useCardCreatedSubscription>;
export type CardCreatedSubscriptionResult = Apollo.SubscriptionResult<CardCreatedSubscription>;
export const CardMovedDocument = gql`
    subscription cardMoved($boardId: ID!) {
  cardMoved(boardId: $boardId) {
    card {
      id
      index
    }
    sourceIndex
    destinationIndex
    destinationListId
  }
}
    `;

/**
 * __useCardMovedSubscription__
 *
 * To run a query within a React component, call `useCardMovedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardMovedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardMovedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCardMovedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CardMovedSubscription, CardMovedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CardMovedSubscription, CardMovedSubscriptionVariables>(CardMovedDocument, options);
      }
export type CardMovedSubscriptionHookResult = ReturnType<typeof useCardMovedSubscription>;
export type CardMovedSubscriptionResult = Apollo.SubscriptionResult<CardMovedSubscription>;
export const CardUpdatedDocument = gql`
    subscription cardUpdated($boardId: ID!) {
  cardUpdated(boardId: $boardId) {
    id
    name
    description
  }
}
    `;

/**
 * __useCardUpdatedSubscription__
 *
 * To run a query within a React component, call `useCardUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardUpdatedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCardUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CardUpdatedSubscription, CardUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CardUpdatedSubscription, CardUpdatedSubscriptionVariables>(CardUpdatedDocument, options);
      }
export type CardUpdatedSubscriptionHookResult = ReturnType<typeof useCardUpdatedSubscription>;
export type CardUpdatedSubscriptionResult = Apollo.SubscriptionResult<CardUpdatedSubscription>;
export const CardDeletedDocument = gql`
    subscription cardDeleted($boardId: ID!) {
  cardDeleted(boardId: $boardId) {
    cardId
  }
}
    `;

/**
 * __useCardDeletedSubscription__
 *
 * To run a query within a React component, call `useCardDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardDeletedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCardDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CardDeletedSubscription, CardDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CardDeletedSubscription, CardDeletedSubscriptionVariables>(CardDeletedDocument, options);
      }
export type CardDeletedSubscriptionHookResult = ReturnType<typeof useCardDeletedSubscription>;
export type CardDeletedSubscriptionResult = Apollo.SubscriptionResult<CardDeletedSubscription>;
export const CardUserAssignedDocument = gql`
    subscription cardUserAssigned($boardId: ID!) {
  cardUserAssigned(boardId: $boardId) {
    cardId
    boardId
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useCardUserAssignedSubscription__
 *
 * To run a query within a React component, call `useCardUserAssignedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardUserAssignedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardUserAssignedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCardUserAssignedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CardUserAssignedSubscription, CardUserAssignedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CardUserAssignedSubscription, CardUserAssignedSubscriptionVariables>(CardUserAssignedDocument, options);
      }
export type CardUserAssignedSubscriptionHookResult = ReturnType<typeof useCardUserAssignedSubscription>;
export type CardUserAssignedSubscriptionResult = Apollo.SubscriptionResult<CardUserAssignedSubscription>;
export const CardUserUnassignedDocument = gql`
    subscription cardUserUnassigned($boardId: ID!) {
  cardUserUnassigned(boardId: $boardId) {
    cardId
  }
}
    `;

/**
 * __useCardUserUnassignedSubscription__
 *
 * To run a query within a React component, call `useCardUserUnassignedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCardUserUnassignedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardUserUnassignedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCardUserUnassignedSubscription(baseOptions: Apollo.SubscriptionHookOptions<CardUserUnassignedSubscription, CardUserUnassignedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CardUserUnassignedSubscription, CardUserUnassignedSubscriptionVariables>(CardUserUnassignedDocument, options);
      }
export type CardUserUnassignedSubscriptionHookResult = ReturnType<typeof useCardUserUnassignedSubscription>;
export type CardUserUnassignedSubscriptionResult = Apollo.SubscriptionResult<CardUserUnassignedSubscription>;
export const CreateFlairDocument = gql`
    mutation createFlair($teamId: ID!, $name: String!, $hue: Int!) {
  createFlair(teamId: $teamId, name: $name, hue: $hue) {
    flair {
      ...FlairInfo
    }
    exists
  }
}
    ${FlairInfoFragmentDoc}`;
export type CreateFlairMutationFn = Apollo.MutationFunction<CreateFlairMutation, CreateFlairMutationVariables>;

/**
 * __useCreateFlairMutation__
 *
 * To run a mutation, you first call `useCreateFlairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFlairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFlairMutation, { data, loading, error }] = useCreateFlairMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      name: // value for 'name'
 *      hue: // value for 'hue'
 *   },
 * });
 */
export function useCreateFlairMutation(baseOptions?: Apollo.MutationHookOptions<CreateFlairMutation, CreateFlairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFlairMutation, CreateFlairMutationVariables>(CreateFlairDocument, options);
      }
export type CreateFlairMutationHookResult = ReturnType<typeof useCreateFlairMutation>;
export type CreateFlairMutationResult = Apollo.MutationResult<CreateFlairMutation>;
export type CreateFlairMutationOptions = Apollo.BaseMutationOptions<CreateFlairMutation, CreateFlairMutationVariables>;
export const ChangeFlairHueDocument = gql`
    mutation changeFlairHue($flairId: ID!, $hue: Int!) {
  changeFlairHue(flairId: $flairId, hue: $hue)
}
    `;
export type ChangeFlairHueMutationFn = Apollo.MutationFunction<ChangeFlairHueMutation, ChangeFlairHueMutationVariables>;

/**
 * __useChangeFlairHueMutation__
 *
 * To run a mutation, you first call `useChangeFlairHueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFlairHueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFlairHueMutation, { data, loading, error }] = useChangeFlairHueMutation({
 *   variables: {
 *      flairId: // value for 'flairId'
 *      hue: // value for 'hue'
 *   },
 * });
 */
export function useChangeFlairHueMutation(baseOptions?: Apollo.MutationHookOptions<ChangeFlairHueMutation, ChangeFlairHueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeFlairHueMutation, ChangeFlairHueMutationVariables>(ChangeFlairHueDocument, options);
      }
export type ChangeFlairHueMutationHookResult = ReturnType<typeof useChangeFlairHueMutation>;
export type ChangeFlairHueMutationResult = Apollo.MutationResult<ChangeFlairHueMutation>;
export type ChangeFlairHueMutationOptions = Apollo.BaseMutationOptions<ChangeFlairHueMutation, ChangeFlairHueMutationVariables>;
export const RenameFlairDocument = gql`
    mutation renameFlair($flairId: ID!, $name: String!) {
  renameFlair(flairId: $flairId, name: $name) {
    success
    exists
  }
}
    `;
export type RenameFlairMutationFn = Apollo.MutationFunction<RenameFlairMutation, RenameFlairMutationVariables>;

/**
 * __useRenameFlairMutation__
 *
 * To run a mutation, you first call `useRenameFlairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameFlairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameFlairMutation, { data, loading, error }] = useRenameFlairMutation({
 *   variables: {
 *      flairId: // value for 'flairId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameFlairMutation(baseOptions?: Apollo.MutationHookOptions<RenameFlairMutation, RenameFlairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameFlairMutation, RenameFlairMutationVariables>(RenameFlairDocument, options);
      }
export type RenameFlairMutationHookResult = ReturnType<typeof useRenameFlairMutation>;
export type RenameFlairMutationResult = Apollo.MutationResult<RenameFlairMutation>;
export type RenameFlairMutationOptions = Apollo.BaseMutationOptions<RenameFlairMutation, RenameFlairMutationVariables>;
export const DeleteFlairDocument = gql`
    mutation deleteFlair($flairId: ID!) {
  deleteFlair(flairId: $flairId)
}
    `;
export type DeleteFlairMutationFn = Apollo.MutationFunction<DeleteFlairMutation, DeleteFlairMutationVariables>;

/**
 * __useDeleteFlairMutation__
 *
 * To run a mutation, you first call `useDeleteFlairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFlairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFlairMutation, { data, loading, error }] = useDeleteFlairMutation({
 *   variables: {
 *      flairId: // value for 'flairId'
 *   },
 * });
 */
export function useDeleteFlairMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFlairMutation, DeleteFlairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFlairMutation, DeleteFlairMutationVariables>(DeleteFlairDocument, options);
      }
export type DeleteFlairMutationHookResult = ReturnType<typeof useDeleteFlairMutation>;
export type DeleteFlairMutationResult = Apollo.MutationResult<DeleteFlairMutation>;
export type DeleteFlairMutationOptions = Apollo.BaseMutationOptions<DeleteFlairMutation, DeleteFlairMutationVariables>;
export const AssignFlairDocument = gql`
    mutation assignFlair($cardId: ID!, $flairId: ID!) {
  assignFlair(cardId: $cardId, flairId: $flairId)
}
    `;
export type AssignFlairMutationFn = Apollo.MutationFunction<AssignFlairMutation, AssignFlairMutationVariables>;

/**
 * __useAssignFlairMutation__
 *
 * To run a mutation, you first call `useAssignFlairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignFlairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignFlairMutation, { data, loading, error }] = useAssignFlairMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      flairId: // value for 'flairId'
 *   },
 * });
 */
export function useAssignFlairMutation(baseOptions?: Apollo.MutationHookOptions<AssignFlairMutation, AssignFlairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignFlairMutation, AssignFlairMutationVariables>(AssignFlairDocument, options);
      }
export type AssignFlairMutationHookResult = ReturnType<typeof useAssignFlairMutation>;
export type AssignFlairMutationResult = Apollo.MutationResult<AssignFlairMutation>;
export type AssignFlairMutationOptions = Apollo.BaseMutationOptions<AssignFlairMutation, AssignFlairMutationVariables>;
export const UnassignFlairDocument = gql`
    mutation unassignFlair($cardId: ID!, $flairId: ID!) {
  unassignFlair(cardId: $cardId, flairId: $flairId)
}
    `;
export type UnassignFlairMutationFn = Apollo.MutationFunction<UnassignFlairMutation, UnassignFlairMutationVariables>;

/**
 * __useUnassignFlairMutation__
 *
 * To run a mutation, you first call `useUnassignFlairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignFlairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignFlairMutation, { data, loading, error }] = useUnassignFlairMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      flairId: // value for 'flairId'
 *   },
 * });
 */
export function useUnassignFlairMutation(baseOptions?: Apollo.MutationHookOptions<UnassignFlairMutation, UnassignFlairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignFlairMutation, UnassignFlairMutationVariables>(UnassignFlairDocument, options);
      }
export type UnassignFlairMutationHookResult = ReturnType<typeof useUnassignFlairMutation>;
export type UnassignFlairMutationResult = Apollo.MutationResult<UnassignFlairMutation>;
export type UnassignFlairMutationOptions = Apollo.BaseMutationOptions<UnassignFlairMutation, UnassignFlairMutationVariables>;
export const FlairCreatedDocument = gql`
    subscription flairCreated($teamId: ID!) {
  flairCreated(teamId: $teamId) {
    ...FlairInfo
  }
}
    ${FlairInfoFragmentDoc}`;

/**
 * __useFlairCreatedSubscription__
 *
 * To run a query within a React component, call `useFlairCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFlairCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlairCreatedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFlairCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FlairCreatedSubscription, FlairCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FlairCreatedSubscription, FlairCreatedSubscriptionVariables>(FlairCreatedDocument, options);
      }
export type FlairCreatedSubscriptionHookResult = ReturnType<typeof useFlairCreatedSubscription>;
export type FlairCreatedSubscriptionResult = Apollo.SubscriptionResult<FlairCreatedSubscription>;
export const FlairUpdatedDocument = gql`
    subscription flairUpdated($teamId: ID!) {
  flairUpdated(teamId: $teamId) {
    ...FlairInfo
  }
}
    ${FlairInfoFragmentDoc}`;

/**
 * __useFlairUpdatedSubscription__
 *
 * To run a query within a React component, call `useFlairUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFlairUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlairUpdatedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFlairUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FlairUpdatedSubscription, FlairUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FlairUpdatedSubscription, FlairUpdatedSubscriptionVariables>(FlairUpdatedDocument, options);
      }
export type FlairUpdatedSubscriptionHookResult = ReturnType<typeof useFlairUpdatedSubscription>;
export type FlairUpdatedSubscriptionResult = Apollo.SubscriptionResult<FlairUpdatedSubscription>;
export const FlairDeletedDocument = gql`
    subscription flairDeleted($teamId: ID!) {
  flairDeleted(teamId: $teamId) {
    flairId
  }
}
    `;

/**
 * __useFlairDeletedSubscription__
 *
 * To run a query within a React component, call `useFlairDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFlairDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlairDeletedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFlairDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FlairDeletedSubscription, FlairDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FlairDeletedSubscription, FlairDeletedSubscriptionVariables>(FlairDeletedDocument, options);
      }
export type FlairDeletedSubscriptionHookResult = ReturnType<typeof useFlairDeletedSubscription>;
export type FlairDeletedSubscriptionResult = Apollo.SubscriptionResult<FlairDeletedSubscription>;
export const FlairAssignedDocument = gql`
    subscription flairAssigned($teamId: ID!) {
  flairAssigned(teamId: $teamId) {
    flairId
    cardId
  }
}
    `;

/**
 * __useFlairAssignedSubscription__
 *
 * To run a query within a React component, call `useFlairAssignedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFlairAssignedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlairAssignedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFlairAssignedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FlairAssignedSubscription, FlairAssignedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FlairAssignedSubscription, FlairAssignedSubscriptionVariables>(FlairAssignedDocument, options);
      }
export type FlairAssignedSubscriptionHookResult = ReturnType<typeof useFlairAssignedSubscription>;
export type FlairAssignedSubscriptionResult = Apollo.SubscriptionResult<FlairAssignedSubscription>;
export const FlairUnassignedDocument = gql`
    subscription flairUnassigned($teamId: ID!) {
  flairUnassigned(teamId: $teamId) {
    flairId
    cardId
  }
}
    `;

/**
 * __useFlairUnassignedSubscription__
 *
 * To run a query within a React component, call `useFlairUnassignedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFlairUnassignedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlairUnassignedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useFlairUnassignedSubscription(baseOptions: Apollo.SubscriptionHookOptions<FlairUnassignedSubscription, FlairUnassignedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FlairUnassignedSubscription, FlairUnassignedSubscriptionVariables>(FlairUnassignedDocument, options);
      }
export type FlairUnassignedSubscriptionHookResult = ReturnType<typeof useFlairUnassignedSubscription>;
export type FlairUnassignedSubscriptionResult = Apollo.SubscriptionResult<FlairUnassignedSubscription>;
export const GenerateInviteDocument = gql`
    mutation generateInvite($teamId: ID!, $expiration: String!) {
  generateInvite(teamId: $teamId, expiration: $expiration)
}
    `;
export type GenerateInviteMutationFn = Apollo.MutationFunction<GenerateInviteMutation, GenerateInviteMutationVariables>;

/**
 * __useGenerateInviteMutation__
 *
 * To run a mutation, you first call `useGenerateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateInviteMutation, { data, loading, error }] = useGenerateInviteMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      expiration: // value for 'expiration'
 *   },
 * });
 */
export function useGenerateInviteMutation(baseOptions?: Apollo.MutationHookOptions<GenerateInviteMutation, GenerateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateInviteMutation, GenerateInviteMutationVariables>(GenerateInviteDocument, options);
      }
export type GenerateInviteMutationHookResult = ReturnType<typeof useGenerateInviteMutation>;
export type GenerateInviteMutationResult = Apollo.MutationResult<GenerateInviteMutation>;
export type GenerateInviteMutationOptions = Apollo.BaseMutationOptions<GenerateInviteMutation, GenerateInviteMutationVariables>;
export const JoinUsingInviteDocument = gql`
    mutation joinUsingInvite($token: String!) {
  joinUsingInvite(token: $token) {
    team {
      ...TeamInfo
    }
    alreadyInTeam
  }
}
    ${TeamInfoFragmentDoc}`;
export type JoinUsingInviteMutationFn = Apollo.MutationFunction<JoinUsingInviteMutation, JoinUsingInviteMutationVariables>;

/**
 * __useJoinUsingInviteMutation__
 *
 * To run a mutation, you first call `useJoinUsingInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinUsingInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinUsingInviteMutation, { data, loading, error }] = useJoinUsingInviteMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useJoinUsingInviteMutation(baseOptions?: Apollo.MutationHookOptions<JoinUsingInviteMutation, JoinUsingInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinUsingInviteMutation, JoinUsingInviteMutationVariables>(JoinUsingInviteDocument, options);
      }
export type JoinUsingInviteMutationHookResult = ReturnType<typeof useJoinUsingInviteMutation>;
export type JoinUsingInviteMutationResult = Apollo.MutationResult<JoinUsingInviteMutation>;
export type JoinUsingInviteMutationOptions = Apollo.BaseMutationOptions<JoinUsingInviteMutation, JoinUsingInviteMutationVariables>;
export const InviteIntervalsDocument = gql`
    query inviteIntervals {
  inviteIntervals
}
    `;

/**
 * __useInviteIntervalsQuery__
 *
 * To run a query within a React component, call `useInviteIntervalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInviteIntervalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInviteIntervalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInviteIntervalsQuery(baseOptions?: Apollo.QueryHookOptions<InviteIntervalsQuery, InviteIntervalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InviteIntervalsQuery, InviteIntervalsQueryVariables>(InviteIntervalsDocument, options);
      }
export function useInviteIntervalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InviteIntervalsQuery, InviteIntervalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InviteIntervalsQuery, InviteIntervalsQueryVariables>(InviteIntervalsDocument, options);
        }
export type InviteIntervalsQueryHookResult = ReturnType<typeof useInviteIntervalsQuery>;
export type InviteIntervalsLazyQueryHookResult = ReturnType<typeof useInviteIntervalsLazyQuery>;
export type InviteIntervalsQueryResult = Apollo.QueryResult<InviteIntervalsQuery, InviteIntervalsQueryVariables>;
export const CreateListDocument = gql`
    mutation createList($boardId: ID!, $name: String!) {
  createList(boardId: $boardId, name: $name) {
    list {
      id
      name
    }
    exists
  }
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

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
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const DeleteListDocument = gql`
    mutation deleteList($id: ID!) {
  deleteList(id: $id)
}
    `;
export type DeleteListMutationFn = Apollo.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

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
export function useDeleteListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const MoveListDocument = gql`
    mutation moveList($destinationIndex: Int!, $listId: ID!) {
  moveList(destinationIndex: $destinationIndex, listId: $listId)
}
    `;
export type MoveListMutationFn = Apollo.MutationFunction<MoveListMutation, MoveListMutationVariables>;

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
export function useMoveListMutation(baseOptions?: Apollo.MutationHookOptions<MoveListMutation, MoveListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveListMutation, MoveListMutationVariables>(MoveListDocument, options);
      }
export type MoveListMutationHookResult = ReturnType<typeof useMoveListMutation>;
export type MoveListMutationResult = Apollo.MutationResult<MoveListMutation>;
export type MoveListMutationOptions = Apollo.BaseMutationOptions<MoveListMutation, MoveListMutationVariables>;
export const RenameListDocument = gql`
    mutation renameList($name: String!, $listId: ID!) {
  renameList(name: $name, listId: $listId) {
    success
    exists
  }
}
    `;
export type RenameListMutationFn = Apollo.MutationFunction<RenameListMutation, RenameListMutationVariables>;

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
export function useRenameListMutation(baseOptions?: Apollo.MutationHookOptions<RenameListMutation, RenameListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameListMutation, RenameListMutationVariables>(RenameListDocument, options);
      }
export type RenameListMutationHookResult = ReturnType<typeof useRenameListMutation>;
export type RenameListMutationResult = Apollo.MutationResult<RenameListMutation>;
export type RenameListMutationOptions = Apollo.BaseMutationOptions<RenameListMutation, RenameListMutationVariables>;
export const ListCreatedDocument = gql`
    subscription listCreated($boardId: ID!) {
  listCreated(boardId: $boardId) {
    id
    name
    index
  }
}
    `;

/**
 * __useListCreatedSubscription__
 *
 * To run a query within a React component, call `useListCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useListCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCreatedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useListCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ListCreatedSubscription, ListCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ListCreatedSubscription, ListCreatedSubscriptionVariables>(ListCreatedDocument, options);
      }
export type ListCreatedSubscriptionHookResult = ReturnType<typeof useListCreatedSubscription>;
export type ListCreatedSubscriptionResult = Apollo.SubscriptionResult<ListCreatedSubscription>;
export const ListRenamedDocument = gql`
    subscription listRenamed($boardId: ID!) {
  listRenamed(boardId: $boardId) {
    id
    name
  }
}
    `;

/**
 * __useListRenamedSubscription__
 *
 * To run a query within a React component, call `useListRenamedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useListRenamedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRenamedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useListRenamedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ListRenamedSubscription, ListRenamedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ListRenamedSubscription, ListRenamedSubscriptionVariables>(ListRenamedDocument, options);
      }
export type ListRenamedSubscriptionHookResult = ReturnType<typeof useListRenamedSubscription>;
export type ListRenamedSubscriptionResult = Apollo.SubscriptionResult<ListRenamedSubscription>;
export const ListMovedDocument = gql`
    subscription listMoved($boardId: ID!) {
  listMoved(boardId: $boardId) {
    list {
      id
      index
    }
    sourceIndex
    destinationIndex
  }
}
    `;

/**
 * __useListMovedSubscription__
 *
 * To run a query within a React component, call `useListMovedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useListMovedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListMovedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useListMovedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ListMovedSubscription, ListMovedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ListMovedSubscription, ListMovedSubscriptionVariables>(ListMovedDocument, options);
      }
export type ListMovedSubscriptionHookResult = ReturnType<typeof useListMovedSubscription>;
export type ListMovedSubscriptionResult = Apollo.SubscriptionResult<ListMovedSubscription>;
export const ListDeletedDocument = gql`
    subscription listDeleted($boardId: ID!) {
  listDeleted(boardId: $boardId)
}
    `;

/**
 * __useListDeletedSubscription__
 *
 * To run a query within a React component, call `useListDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useListDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeletedSubscription({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useListDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ListDeletedSubscription, ListDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ListDeletedSubscription, ListDeletedSubscriptionVariables>(ListDeletedDocument, options);
      }
export type ListDeletedSubscriptionHookResult = ReturnType<typeof useListDeletedSubscription>;
export type ListDeletedSubscriptionResult = Apollo.SubscriptionResult<ListDeletedSubscription>;
export const RemoveUserDocument = gql`
    mutation removeUser($teamId: ID!, $userId: ID!) {
  removeUser(teamId: $teamId, userId: $userId)
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

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
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const RenameTeamDocument = gql`
    mutation renameTeam($name: String!, $teamId: ID!) {
  renameTeam(name: $name, teamId: $teamId) {
    success
    exists
  }
}
    `;
export type RenameTeamMutationFn = Apollo.MutationFunction<RenameTeamMutation, RenameTeamMutationVariables>;

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
export function useRenameTeamMutation(baseOptions?: Apollo.MutationHookOptions<RenameTeamMutation, RenameTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameTeamMutation, RenameTeamMutationVariables>(RenameTeamDocument, options);
      }
export type RenameTeamMutationHookResult = ReturnType<typeof useRenameTeamMutation>;
export type RenameTeamMutationResult = Apollo.MutationResult<RenameTeamMutation>;
export type RenameTeamMutationOptions = Apollo.BaseMutationOptions<RenameTeamMutation, RenameTeamMutationVariables>;
export const AddUserDocument = gql`
    mutation addUser($username: String!, $teamId: ID!) {
  addUser(username: $username, teamId: $teamId) {
    userId
    username
    alreadyInTeam
    doesNotExist
  }
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

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
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($name: String!) {
  createTeam(name: $name) {
    team {
      id
      name
    }
    exists
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

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
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation deleteTeam($id: ID!) {
  deleteTeam(id: $id)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

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
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const LeaveTeamDocument = gql`
    mutation leaveTeam($teamId: ID!) {
  leaveTeam(teamId: $teamId)
}
    `;
export type LeaveTeamMutationFn = Apollo.MutationFunction<LeaveTeamMutation, LeaveTeamMutationVariables>;

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
export function useLeaveTeamMutation(baseOptions?: Apollo.MutationHookOptions<LeaveTeamMutation, LeaveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveTeamMutation, LeaveTeamMutationVariables>(LeaveTeamDocument, options);
      }
export type LeaveTeamMutationHookResult = ReturnType<typeof useLeaveTeamMutation>;
export type LeaveTeamMutationResult = Apollo.MutationResult<LeaveTeamMutation>;
export type LeaveTeamMutationOptions = Apollo.BaseMutationOptions<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const TeamDeletedDocument = gql`
    subscription TeamDeleted {
  teamDeleted
}
    `;

/**
 * __useTeamDeletedSubscription__
 *
 * To run a query within a React component, call `useTeamDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTeamDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TeamDeletedSubscription, TeamDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamDeletedSubscription, TeamDeletedSubscriptionVariables>(TeamDeletedDocument, options);
      }
export type TeamDeletedSubscriptionHookResult = ReturnType<typeof useTeamDeletedSubscription>;
export type TeamDeletedSubscriptionResult = Apollo.SubscriptionResult<TeamDeletedSubscription>;
export const TeamRenamedDocument = gql`
    subscription TeamRenamed {
  teamRenamed {
    id
    name
  }
}
    `;

/**
 * __useTeamRenamedSubscription__
 *
 * To run a query within a React component, call `useTeamRenamedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamRenamedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamRenamedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTeamRenamedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TeamRenamedSubscription, TeamRenamedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamRenamedSubscription, TeamRenamedSubscriptionVariables>(TeamRenamedDocument, options);
      }
export type TeamRenamedSubscriptionHookResult = ReturnType<typeof useTeamRenamedSubscription>;
export type TeamRenamedSubscriptionResult = Apollo.SubscriptionResult<TeamRenamedSubscription>;
export const TeamUserAddedDocument = gql`
    subscription teamUserAdded($teamId: ID) {
  teamUserAdded(teamId: $teamId) {
    team {
      ...TeamInfo
    }
    user {
      ...UserInfo
    }
  }
}
    ${TeamInfoFragmentDoc}
${UserInfoFragmentDoc}`;

/**
 * __useTeamUserAddedSubscription__
 *
 * To run a query within a React component, call `useTeamUserAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamUserAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamUserAddedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamUserAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TeamUserAddedSubscription, TeamUserAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamUserAddedSubscription, TeamUserAddedSubscriptionVariables>(TeamUserAddedDocument, options);
      }
export type TeamUserAddedSubscriptionHookResult = ReturnType<typeof useTeamUserAddedSubscription>;
export type TeamUserAddedSubscriptionResult = Apollo.SubscriptionResult<TeamUserAddedSubscription>;
export const TeamUserRemovedDocument = gql`
    subscription teamUserRemoved($teamId: ID) {
  teamUserRemoved(teamId: $teamId) {
    teamId
    userId
  }
}
    `;

/**
 * __useTeamUserRemovedSubscription__
 *
 * To run a query within a React component, call `useTeamUserRemovedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTeamUserRemovedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamUserRemovedSubscription({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamUserRemovedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TeamUserRemovedSubscription, TeamUserRemovedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TeamUserRemovedSubscription, TeamUserRemovedSubscriptionVariables>(TeamUserRemovedDocument, options);
      }
export type TeamUserRemovedSubscriptionHookResult = ReturnType<typeof useTeamUserRemovedSubscription>;
export type TeamUserRemovedSubscriptionResult = Apollo.SubscriptionResult<TeamUserRemovedSubscription>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    id
    username
    email
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
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
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    username
  }
}
    `;

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
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  currentUser {
    ...UserTeamsInfo
  }
}
    ${UserTeamsInfoFragmentDoc}`;

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
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;