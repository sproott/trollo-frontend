import { gql } from "@apollo/client/core"

export const BoardQueryTeam = gql`
  fragment BoardQueryTeam on Team {
    id
    participants {
      ...ParticipantUser
    }
  }
`

export const TeamsQueryTeam = gql`
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
`
