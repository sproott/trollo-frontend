import { gql } from "@apollo/client/core"

export const deleteCard = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id)
  }
`
