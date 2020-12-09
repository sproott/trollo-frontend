import { gql } from "@apollo/client/core"

export const BoardQueryTeam = gql`
  fragment BoardQueryTeam on Team {
    id
    participants {
      ...ParticipantUser
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
