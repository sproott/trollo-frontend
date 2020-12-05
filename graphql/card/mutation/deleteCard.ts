import { gql } from "@apollo/client"

export const deleteCard = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id)
  }
`
