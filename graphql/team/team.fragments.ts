import gql from "graphql-tag"

export const BoardQueryTeam = gql`
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
`

export const TeamInfo = gql`
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
`

export const removeUser = gql`
  mutation RemoveUser($teamId: String!, $userId: String!) {
    removeUser(teamId: $teamId, userId: $userId)
  }
`

export const renameTeam = gql`
  mutation RenameTeam($name: String!, $teamId: String!) {
    renameTeam(name: $name, teamId: $teamId) {
      success
      exists
    }
  }
`
