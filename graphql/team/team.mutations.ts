import { gql } from "@apollo/client/core"

export const addUser = gql`
  mutation AddUser($username: String!, $teamId: String!) {
    addUser(username: $username, teamId: $teamId) {
      userId
      username
      alreadyInTeam
      doesNotExist
    }
  }
`

export const createTeam = gql`
  mutation CreateTeam($name: String!) {
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
  mutation DeleteTeam($id: String!) {
    deleteTeam(id: $id)
  }
`

export const leaveTeam = gql`
  mutation LeaveTeam($teamId: String!) {
    leaveTeam(teamId: $teamId)
  }
`
