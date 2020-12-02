import { gql } from "@apollo/client"

export const teams = gql`
  fragment TeamInfo on Team {
    id
    name
    boards {
      id
      name
    }
    participants {
      user {
        id
        username
      }
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
