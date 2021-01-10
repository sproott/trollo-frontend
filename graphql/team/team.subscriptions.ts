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
  subscription TeamUserAdded($teamId: String) {
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
  subscription TeamUserRemoved($teamId: String) {
    teamUserRemoved(teamId: $teamId) {
      teamId
      userId
    }
  }
`
