import { gql } from "@apollo/client/core"

export const fragments = gql`
  fragment ParticipantTeam on Participant {
    team {
      ...TeamsQueryTeam
    }
  }

  fragment ParticipantUser on Participant {
    user {
      ...UserInfo
    }
  }
`
