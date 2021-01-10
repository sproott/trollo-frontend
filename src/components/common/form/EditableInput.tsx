import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { UseFormMethods, useForm } from "react-hook-form"

import Box from "../util/Box"
import { Div } from "../util/Text"
import { Form } from "antd"

type FormData = {
  text: string
}

export type EditableInputProps = {
  text: string
  label?: string
  onConfirm: (text: string) => void
  onChange?: (text: string) => void
  maxLength?: number
  error?: string
  success?: boolean
  optional?: boolean
  children: RenderFn
}

export type RenderFn = (args: {
  useFormMethods: UseFormMethods<FormData>
  reopened: boolean
  onSubmit: ({ text }: FormData) => void
  onChange: (text: string) => void
}) => React.ReactNode

const EditableInput = ({
  text,
  label,
  onConfirm,
  onChange,
  success,
  children,
}: EditableInputProps) => {
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
  const { handleSubmit, reset, watch } = useFormMethods
  const { text: watchedText } = watch()
  useEffect(() => {
    onChange && onChange(watchedText)
  }, [watchedText])

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
    if (editing) reset({ text })
  }, [editing])

  if (submitted && onSubmitFinished) {
    setOnSubmitFinished(false)
    if (success) {
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
              {children({ useFormMethods, reopened, onSubmit, onChange })}
              <CheckOutlined onClick={handleSubmit(onSubmit)} />
              <CloseOutlined onClick={cancel} />
            </Box>
          </Form>
        )}
      </Box>
    </div>
  )
}

export default EditableInput
