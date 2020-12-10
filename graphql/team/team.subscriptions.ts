import { gql } from "@apollo/client/core"

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
  subscription TeamUserAdded {
    teamUserAdded {
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
  subscription TeamUserRemoved {
    teamUserRemoved {
      teamId
      userId
    }
  }
`
