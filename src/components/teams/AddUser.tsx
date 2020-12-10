import React, { useEffect, useState } from "react"
import Avatar from "../common/Avatar"
import theme from "../../style/theme"
import Box from "../common/Box"
import { Form } from "antd"
import TextInput from "../common/form/TextInput"
import { useForm } from "react-hook-form"
import { useAddUserMutation } from "../../../generated/graphql"

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
