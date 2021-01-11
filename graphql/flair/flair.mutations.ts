import gql from "graphql-tag"

export const createFlair = gql`
  mutation CreateFlair($teamId: String!, $name: String!, $hue: Int!) {
    createFlair(teamId: $teamId, name: $name, hue: $hue) {
      flair {
        ...FlairInfo
      }
      exists
    }
  }
`

export const changeFlairHue = gql`
  mutation ChangeFlairHue($flairId: String!, $hue: Int!) {
    changeFlairHue(flairId: $flairId, hue: $hue)
  }
`

export const renameFlair = gql`
  mutation RenameFlair($flairId: String!, $name: String!) {
    renameFlair(flairId: $flairId, name: $name) {
      success
      exists
    }
  }
`

export const deleteFlair = gql`
  mutation DeleteFlair($flairId: String!) {
    deleteFlair(flairId: $flairId)
  }
`