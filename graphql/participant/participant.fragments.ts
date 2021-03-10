import gql from "graphql-tag"

export const ParticipantTeam = gql`
  fragment ParticipantTeam on Participant {
    team {
      ...TeamInfo
    }
  }
`

export const ParticipantUser = gql`
  fragment ParticipantUser on Participant {
    owner
    user {
      ...UserInfo
    }
  }
`
