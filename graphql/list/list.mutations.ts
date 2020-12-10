import gql from "graphql-tag"

export const CreateList = gql`
  mutation createList($boardId: String!, $name: String!) {
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
  mutation DeleteList($id: String!) {
    deleteList(id: $id)
  }
`

export const moveList = gql`
  mutation MoveList($destinationIndex: Int!, $listId: String!) {
    moveList(destinationIndex: $destinationIndex, listId: $listId)
  }
`

export const renameList = gql`
  mutation RenameList($name: String!, $listId: String!) {
    renameList(name: $name, listId: $listId) {
      success
      exists
    }
  }
`
