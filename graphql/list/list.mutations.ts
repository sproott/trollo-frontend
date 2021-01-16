import gql from "graphql-tag"

export const CreateList = gql`
  mutation createList($boardId: ID!, $name: String!) {
    createList(boardId: $boardId, name: $name) {
      list {
        id
        name
      }
      exists
    }
  }
`

export const deleteList = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id)
  }
`

export const moveList = gql`
  mutation moveList($destinationIndex: Int!, $listId: ID!) {
    moveList(destinationIndex: $destinationIndex, listId: $listId)
  }
`

export const renameList = gql`
  mutation renameList($name: String!, $listId: ID!) {
    renameList(name: $name, listId: $listId) {
      success
      exists
    }
  }
`
