import { gql } from "@apollo/client/core"

export const fragments = gql`
  fragment UserInfo on User {
    id
    username
  }

  fragment UserTeamsInfo on User {
    id
    owns {
      ...ParticipantTeam
    }
    participatesIn {
      ...ParticipantTeam
    }
  }
`
