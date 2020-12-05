import { gql } from "@apollo/client"

export const renameList = gql`
  mutation RenameList($name: String!, $listId: String!) {
    renameList(name: $name, listId: $listId) {
      success
      exists
    }
  }
`
