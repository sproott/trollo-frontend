import React, { useEffect, useState } from "react"
import Box from "../Box"
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Text } from "../Text"
import { useForm } from "react-hook-form"
import TextInput from "./TextInput"

type FormData = {
  text: string
}

function EditableText({
  text,
  label,
  onConfirm,
  containerVisible,
}: {
  text: string
  label?: string
  onConfirm: (text: string) => void
  containerVisible?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      text,
    },
  })
  const edit = () => {
    setEditing(true)
  }
  const cancel = () => {
    setEditing(false)
  }
  const onSubmit = ({ text }: FormData) => {
    setEditing(false)
    onConfirm(text)
    reset({ text })
  }

  useEffect(() => {
    if (containerVisible === false) {
      setEditing(false)
    }
  }, [containerVisible])

  return (
    <div>
      <Box flex gap="7px" alignItems="center">
        {!!label && <Text>{label}</Text>}
        {!editing ? (
          <>
            <Text>{text}</Text>
            <EditOutlined onClick={edit} style={{ padding: "0 5px" }} />
          </>
        ) : (
          <>
            <TextInput name="text" control={control} />
            <CheckOutlined onClick={handleSubmit(onSubmit)} />
            <CloseOutlined onClick={cancel} />
          </>
        )}
      </Box>
    </div>
  )
}

export default EditableText
