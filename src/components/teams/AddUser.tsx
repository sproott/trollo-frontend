import React, { useEffect, useState } from "react"
import Avatar from "../common/Avatar"
import theme from "../../style/theme"
import Box from "../common/Box"
import { Form } from "antd"
import TextInput from "../common/form/TextInput"
import { useForm } from "react-hook-form"
import { TeamsDocument, TeamsQuery, useAddUserMutation } from "../../../generated/graphql"
import produce from "immer"
import { CloseOutlined } from "@ant-design/icons"

type FormData = {
  username: string
}

function AddUser({ teamId, containerVisible }: { teamId: string; containerVisible?: boolean }) {
  const { control, handleSubmit, reset: resetForm } = useForm<FormData>({
    defaultValues: { username: "" },
  })
  const [addUser] = useAddUserMutation()
  const [error, setError] = useState<string>()

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
          const teams = store.readQuery<TeamsQuery>({ query: TeamsDocument })

          store.writeQuery<TeamsQuery>({
            query: TeamsDocument,
            data: produce(teams, (x) => {
              x.currentUser.owns
                .flatMap((p) => p.team)
                .find((t) => t.id === teamId)
                .participants.push({
                  user: {
                    username,
                    id: data.addUser.userId,
                  },
                })
            }),
          })
          resetForm()
        } else if (data.addUser.doesNotExist) {
          setError("User doesn't exist")
          return
        } else if (data.addUser.alreadyInTeam) {
          setError("User already in team")
        } else {
          setError("Cannot add self")
        }
        setError(undefined)
      },
    })
  }

  return (
    <Form onSubmitCapture={handleSubmit(onSubmit)}>
      <Box flex alignItems="center" gap="10px">
        <Avatar username="?" backgroundColor={theme.blue.primary} color="white" pointer />
        <TextInput name="username" maxLength={20} control={control} error={error} />
      </Box>
    </Form>
  )
}

export default AddUser