import { gql } from "@apollo/client/core"

export const ParticipantTeam = gql`
  fragment ParticipantTeam on Participant {
    team {
      ...TeamsQueryTeam
    }
  }
`

export const ParticipantUser = gql`
  fragment ParticipantUser on Participant {
    user {
      ...UserInfo
    }
  }
`
