import { gql } from "@apollo/client"

export const teamsQuery = gql`
  fragment TeamInfo on Team {
    id
    name
    boards {
      id
      name
    }
  }

  query Teams {
    currentUser {
      id
      owns {
        team {
          ...TeamInfo
        }
      }
      participatesIn {
        team {
          ...TeamInfo
        }
      }
    }
  }
`
