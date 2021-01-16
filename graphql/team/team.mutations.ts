import gql from "graphql-tag"

export const addUser = gql`
  mutation addUser($username: String!, $teamId: ID!) {
    addUser(username: $username, teamId: $teamId) {
      userId
      username
      alreadyInTeam
      doesNotExist
    }
  }
`

export const createTeam = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      team {
        id
        name
      }
      exists
    }
  }
`

export const deleteTeam = gql`
  mutation deleteTeam($id: ID!) {
    deleteTeam(id: $id)
  }
`

export const leaveTeam = gql`
  mutation leaveTeam($teamId: ID!) {
    leaveTeam(teamId: $teamId)
  }
`
