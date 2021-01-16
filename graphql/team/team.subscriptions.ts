import gql from "graphql-tag"

export const teamDeleted = gql`
  subscription TeamDeleted {
    teamDeleted
  }
`

export const teamRenamed = gql`
  subscription TeamRenamed {
    teamRenamed {
      id
      name
    }
  }
`

export const teamUserAdded = gql`
  subscription teamUserAdded($teamId: ID) {
    teamUserAdded(teamId: $teamId) {
      team {
        ...TeamInfo
      }
      user {
        ...UserInfo
      }
    }
  }
`

export const teamUserRemoved = gql`
  subscription teamUserRemoved($teamId: ID) {
    teamUserRemoved(teamId: $teamId) {
      teamId
      userId
    }
  }
`
