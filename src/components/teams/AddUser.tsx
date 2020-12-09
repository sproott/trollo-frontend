import React, { useEffect, useState } from "react"
import Avatar from "../common/Avatar"
import theme from "../../style/theme"
import Box from "../common/Box"
import { Form } from "antd"
import TextInput from "../common/form/TextInput"
import { useForm } from "react-hook-form"
import {
  ParticipantUserFragment,
  TeamsDocument,
  TeamsQuery,
  TeamsQueryTeamFragment,
  TeamsQueryTeamFragmentDoc,
  useAddUserMutation,
  useCurrentUserQuery,
  UserInfoFragment,
  UserInfoFragmentDoc,
  UserTeamsInfoFragment,
  UserTeamsInfoFragmentDoc,
} from "../../../generated/graphql"
import produce from "immer"
import { CloseOutlined } from "@ant-design/icons"
import { UserTeamsInfo } from "../../../graphql/user/fragment/fragments"

type FormData = {
  username: string
}

function AddUser({ teamId, containerVisible }: { teamId: string; containerVisible?: boolean }) {
  const useFormMethods = useForm<FormData>({
    defaultValues: { username: "" },
  })
  const { handleSubmit, reset: resetForm } = useFormMethods
  const [addUser] = useAddUserMutation()
  const [error, setError] = useState<string>()
  const {
    data: { currentUser },
  } = useCurrentUserQuery()

  useEffect(() => {
    if (containerVisible === false) {
      setError(undefined)
      resetForm()
    }
  }, [containerVisible])

  const onSubmit = ({ username }: FormData) => {
    if (!username || username.length === 0) {
      setError(undefined)
      return
    }
    addUser({
      variables: {
        username,
        teamId,
      },
      update: (store, { data }) => {
        if (!!data.addUser.userId) {
          const team = store.readFragment<TeamsQueryTeamFragment>({
            fragment: TeamsQueryTeamFragmentDoc,
            fragmentName: "TeamsQueryTeam",
            id: "Team:" + teamId,
          })

          store.writeFragment<TeamsQueryTeamFragment>({
            fragment: TeamsQueryTeamFragmentDoc,
            fragmentName: "TeamsQueryTeam",
            id: "Team:" + teamId,
            data: produce(team, (x) => {
              x.participants.push({
                user: {
                  id: data.addUser.userId,
                  username: data.addUser.username,
                },
              })
            }),
          })
          resetForm()
          setError(undefined)
        } else if (data.addUser.doesNotExist) {
          setError("User doesn't exist")
          return
        } else if (data.addUser.alreadyInTeam) {
          setError("User already in team")
        } else {
          setError("Cannot add self")
        }
      },
    })
  }

  return (
    <Form onSubmitCapture={handleSubmit(onSubmit)}>
      <Box flex alignItems="center" gap="10px">
        <Avatar username="?" backgroundColor={theme.blue.primary} color="white" pointer />
        <TextInput name="username" maxLength={20} useFormMethods={useFormMethods} error={error} />
      </Box>
    </Form>
  )
}

export default AddUser
