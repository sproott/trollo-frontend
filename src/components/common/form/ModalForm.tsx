import React, { useState } from "react"
import { Form, Modal } from "antd"
import { DeepPartial, UnpackNestedValue, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Lazy, ObjectSchema } from "yup"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { Control } from "react-hook-form/dist/types/form"

export type ModalFormProps<TInput, TData> = {
  title: string
  defaultValues: UnpackNestedValue<DeepPartial<TInput>>
  schema: ObjectSchema<object> | Lazy
  onSubmit: (formData: TInput) => void
  loading: boolean
  data: TData
  error?: boolean
  customSuccessCondition: (data: TData) => boolean
  renderForm: (control: Control<TInput>, errors: FieldErrors<TInput>) => React.ReactNode
  renderButton: (showModal: () => void) => React.ReactNode
}

const ModalForm = <TInput extends object, TData extends object>({
  title,
  defaultValues,
  schema,
  onSubmit,
  loading,
  data,
  error,
  customSuccessCondition,
  renderForm,
  renderButton,
}: ModalFormProps<TInput, TData>) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [onSubmitFinished, setOnSubmitFinished] = useState(false)
  const { control, handleSubmit, errors, reset: resetForm } = useForm<TInput>({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmitOuter = async (formData: TInput) => {
    setSubmitted(true)
    await onSubmit(formData)
    setOnSubmitFinished(true)
  }

  const showModal = () => {
    resetForm()
    data = undefined
    setModalVisible(true)
  }
  const closeModal = () => setModalVisible(false)

  if (submitted && onSubmitFinished && !loading) {
    setOnSubmitFinished(false)
    if (customSuccessCondition(data)) {
      setSubmitted(false)
      setModalVisible(false)
    } else if (!!error) {
      setSubmitted(false)
    }
  }

  return (
    <>
      <Modal
        title={title}
        visible={modalVisible}
        onCancel={closeModal}
        // @ts-ignore
        onOk={handleSubmit(onSubmitOuter)}
        confirmLoading={submitted}
      >
        {/*@ts-ignore*/}
        <Form onSubmitCapture={handleSubmit(onSubmitOuter)}>{renderForm(control, errors)}</Form>
      </Modal>
      {renderButton(showModal)}
    </>
  )
}

export default ModalForm
