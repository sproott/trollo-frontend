import { gql } from "@apollo/client/core"

export const teamRenamed = gql`
  subscription TeamRenamed {
    teamRenamed {
      id
      name
    }
  }
`
