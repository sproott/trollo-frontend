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
  mutation removeUser($teamId: ID!, $userId: ID!) {
    removeUser(teamId: $teamId, userId: $userId)
  }
`

export const renameTeam = gql`
  mutation renameTeam($name: String!, $teamId: ID!) {
    renameTeam(name: $name, teamId: $teamId) {
      success
      exists
    }
  }
`
