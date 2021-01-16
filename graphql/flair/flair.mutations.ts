import gql from "graphql-tag"

export const createFlair = gql`
  mutation createFlair($teamId: ID!, $name: String!, $hue: Int!) {
    createFlair(teamId: $teamId, name: $name, hue: $hue) {
      flair {
        ...FlairInfo
      }
      exists
    }
  }
`

export const changeFlairHue = gql`
  mutation changeFlairHue($flairId: ID!, $hue: Int!) {
    changeFlairHue(flairId: $flairId, hue: $hue)
  }
`

export const renameFlair = gql`
  mutation renameFlair($flairId: ID!, $name: String!) {
    renameFlair(flairId: $flairId, name: $name) {
      success
      exists
    }
  }
`

export const deleteFlair = gql`
  mutation deleteFlair($flairId: ID!) {
    deleteFlair(flairId: $flairId)
  }
`

export const assignFlair = gql`
  mutation assignFlair($cardId: ID!, $flairId: ID!) {
    assignFlair(cardId: $cardId, flairId: $flairId)
  }
`

export const unassignFlair = gql`
  mutation unassignFlair($cardId: ID!, $flairId: ID!) {
    unassignFlair(cardId: $cardId, flairId: $flairId)
  }
`
