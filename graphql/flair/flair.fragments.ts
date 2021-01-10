import gql from "graphql-tag"

export const FlairInfo = gql`
  fragment FlairInfo on Flair {
    id
    name
    hue
  }
`
