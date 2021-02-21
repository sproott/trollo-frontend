import gql from "graphql-tag"

export const generateInvite = gql`
  mutation generateInvite($teamId: ID!, $expiration: String!) {
    generateInvite(teamId: $teamId, expiration: $expiration)
  }
`

export const joinUsingInvite = gql`
  mutation joinUsingInvite($token: String!) {
    joinUsingInvite(token: $token) {
      team {
        ...TeamInfo
      }
      alreadyInTeam
    }
  }
`
