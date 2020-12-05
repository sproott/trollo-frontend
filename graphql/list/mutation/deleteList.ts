import { gql } from "@apollo/client"

export const deleteList = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id)
  }
`
