import { gql } from "@apollo/client/core"

export const deleteList = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id)
  }
`
