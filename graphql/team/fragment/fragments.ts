import { gql } from "@apollo/client/core"

export const fragments = gql`
  fragment BoardQueryTeam on Team {
    id
    participants {
      ...ParticipantUser
    }
  }

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
