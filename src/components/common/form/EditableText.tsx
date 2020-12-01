import React, { useEffect, useState } from "react"
import Box from "../Box"
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Text } from "../Text"
import { useForm } from "react-hook-form"
import TextInput from "./TextInput"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form } from "antd"

type FormData = {
  text: string
}

const schema = yup.object().shape({
  text: yup.string().required("Cannot be blank"),
})

function EditableText({
  text,
  label,
  onConfirm,
  containerVisible,
  maxLength,
}: {
  text: string
  label?: string
  onConfirm: (text: string) => void
  containerVisible?: boolean
  maxLength?: number
}) {
  const [editing, setEditing] = useState(false)
  const { control, handleSubmit, errors, reset } = useForm<FormData>({
    defaultValues: {
      text,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
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
          <Form onSubmitCapture={handleSubmit(onSubmit)}>
            <Box flex gap="7px" alignItems="center">
              <TextInput
                name="text"
                control={control}
                maxLength={maxLength}
                error={errors.text?.message}
              />
              <CheckOutlined onClick={handleSubmit(onSubmit)} />
              <CloseOutlined onClick={cancel} />
            </Box>
          </Form>
        )}
      </Box>
    </div>
  )
}

export default EditableText
