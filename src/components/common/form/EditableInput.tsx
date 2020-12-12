import React, { useEffect, useState } from "react"
import Box from "../Box"
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Div } from "../Text"
import { useForm, UseFormMethods } from "react-hook-form"
import { Form } from "antd"

type FormData = {
  text: string
}

export type EditableInputProps = {
  text: string
  label?: string
  onConfirm: (text: string) => void
  maxLength?: number
  error?: string
  success?: boolean
  optional?: boolean
  children: RenderFn
}

export type RenderFn = (args: {
  useFormMethods: UseFormMethods<FormData>
  reopened: boolean
  onSubmit: ({ text }: FormData) => Promise<void>
}) => React.ReactNode

function EditableText({ text, label, onConfirm, success, children }: EditableInputProps) {
  const [editing, setEditing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [onSubmitFinished, setOnSubmitFinished] = useState(false)
  const [reopened, setReopened] = useState(true)
  const useFormMethods = useForm<FormData>({
    defaultValues: {
      text,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  })
  const { handleSubmit, errors, reset } = useFormMethods

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

  useEffect(() => () => setEditing(false), [])
  useEffect(() => {
    if (editing) reset({ text })
  }, [editing])

  if (submitted && onSubmitFinished) {
    setOnSubmitFinished(false)
    if (!!success) {
      setEditing(false)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <div>
      <Box flex gap="7px" alignItems="center">
        {!!label && <Div>{label}: </Div>}
        {!editing ? (
          <>
            <Div>{text}</Div>
            <EditOutlined onClick={edit} style={{ padding: "0 5px" }} />
          </>
        ) : (
          <Form onSubmitCapture={handleSubmit(onSubmit)}>
            <Box flex gap="7px" alignItems="center">
              {children({ useFormMethods, reopened, onSubmit })}
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
