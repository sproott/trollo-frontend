import React, { useEffect, useState } from "react"
import Box from "../Box"
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Div } from "../Text"
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
  error,
  success,
}: {
  text: string
  label?: string
  onConfirm: (text: string) => void
  containerVisible?: boolean
  maxLength?: number
  error?: string
  success?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [onSubmitFinished, setOnSubmitFinished] = useState(false)
  const [reopened, setReopened] = useState(true)
  const { control, handleSubmit, errors, reset } = useForm<FormData>({
    defaultValues: {
      text,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })
  const edit = () => {
    setReopened(true)
    setEditing(true)
  }
  const cancel = () => {
    setEditing(false)
    reset({ text })
  }
  const onSubmit = async ({ text }: FormData) => {
    setSubmitted(true)
    await onConfirm(text)
    setOnSubmitFinished(true)
    setReopened(false)
  }

  useEffect(() => {
    if (containerVisible === false) {
      setEditing(false)
    }
  }, [containerVisible])

  if (submitted && onSubmitFinished) {
    setOnSubmitFinished(false)
    if (!!success) {
      setEditing(false)
      reset({ text })
    } else {
      setSubmitted(false)
    }
  }

  return (
    <div>
      <Box flex gap="7px" alignItems="center">
        {!!label && <Div>{label}</Div>}
        {!editing ? (
          <>
            <Div>{text}</Div>
            <EditOutlined onClick={edit} style={{ padding: "0 5px" }} />
          </>
        ) : (
          <Form onSubmitCapture={handleSubmit(onSubmit)}>
            <Box flex gap="7px" alignItems="center">
              <TextInput
                name="text"
                control={control}
                maxLength={maxLength}
                error={!reopened && (errors.text?.message ?? error)}
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
