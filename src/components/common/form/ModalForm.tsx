import { DeepPartial, UnpackNestedValue, UseFormMethods, useForm } from "react-hook-form"
import { Form, Modal } from "antd"
import React, { useState } from "react"

import Box from "../util/Box"

export type ModalFormProps<TInput, TData> = {
  title: string
  defaultValues: UnpackNestedValue<DeepPartial<TInput>>
  onSubmit: (formData: UnpackNestedValue<TInput>) => void
  loading: boolean
  data: TData
  error?: boolean
  customSuccessCondition: (data: TData) => boolean
  renderForm: (useFormMethods: UseFormMethods<TInput>, reset: boolean) => React.ReactNode
  renderButton: (showModal: () => void) => React.ReactNode
  onClose?: () => void
}

const ModalForm = <TInput extends Record<string, unknown>, TData extends Record<string, unknown>>({
  title,
  defaultValues,
  onSubmit,
  loading,
  data,
  error,
  customSuccessCondition,
  renderForm,
  renderButton,
  onClose,
}: ModalFormProps<TInput, TData>) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [onSubmitFinished, setOnSubmitFinished] = useState(false)
  const [reset, setReset] = useState(true)
  const useFormMethods = useForm<TInput>({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  })

  const { handleSubmit, reset: resetForm } = useFormMethods

  const onSubmitOuter = async (formData: UnpackNestedValue<TInput>) => {
    setSubmitted(true)
    await onSubmit(formData)
    setOnSubmitFinished(true)
    setReset(false)
  }

  const showModal = () => {
    resetForm()
    setReset(true)
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
    onClose && onClose()
  }

  if (submitted && onSubmitFinished && !loading) {
    setOnSubmitFinished(false)
    if (customSuccessCondition(data)) {
      setSubmitted(false)
      setModalVisible(false)
    } else if (error) {
      setSubmitted(false)
    }
  }

  return (
    <>
      <Modal
        title={title}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={handleSubmit(onSubmitOuter)}
        confirmLoading={submitted}
        destroyOnClose
      >
        <Form onSubmitCapture={handleSubmit(onSubmitOuter)}>
          <Box flex flexDirection="column" gap="15px">
            {renderForm(useFormMethods, reset)}
          </Box>
        </Form>
      </Modal>
      {renderButton(showModal)}
    </>
  )
}

export default ModalForm
