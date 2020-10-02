import { gql } from "@apollo/client"

export const currentUserQuery = gql`
  fragment TeamInfo on Team {
    id
    name
    boards {
      id
      name
    }
  }

  query Boards {
    currentUser {
      id
      ownTeams {
        ...TeamInfo
      }
      teams {
        ...TeamInfo
      }
    }
  }
`