import { gql } from "@apollo/client/core"

export const UserInfo = gql`
  fragment UserInfo on User {
    id
    username
  }
`

export const UserTeamsInfo = gql`
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
