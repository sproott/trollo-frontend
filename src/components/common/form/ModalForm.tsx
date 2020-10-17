import React, { useState } from "react"
import { Form, Modal } from "antd"
import { DeepPartial, UnpackNestedValue, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import { Lazy, ObjectSchema } from "yup"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { Control } from "react-hook-form/dist/types/form"

export type ModalFormProps<TInput, TData> = {
  title: string
  defaultValues: UnpackNestedValue<DeepPartial<TInput>>
  schema: ObjectSchema<object, object> | Lazy
  onSubmit: (formData: TInput) => void
  loading: boolean
  data: TData
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
  customSuccessCondition,
  renderForm,
  renderButton,
}: ModalFormProps<TInput, TData>) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { control, handleSubmit, errors, reset: resetForm } = useForm<TInput>({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmitOuter = async (formData: TInput) => {
    setSubmitted(true)
    await onSubmit(formData)
  }

  const showModal = () => {
    resetForm()
    setModalVisible(true)
  }
  const closeModal = () => setModalVisible(false)

  if (submitted && !loading && customSuccessCondition(data)) {
    setSubmitted(false)
    setModalVisible(false)
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
