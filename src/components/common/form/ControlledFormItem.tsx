import { Control, Controller } from "react-hook-form"
import React, { ReactChild, ReactChildren, ReactNode } from "react"
import { Form } from "antd"

export type ControlledInputProps = {
  name: string
  label?: string
  control: Control
}

interface ControlledInputWithChildrenProps extends ControlledInputProps {
  children: ReactChild
}

const ControlledFormItem = ({
  name,
  label,
  control,
  children,
}: ControlledInputWithChildrenProps) => {
  return (
    <Controller
      as={<Form.Item label={label}>{children}</Form.Item>}
      control={control}
      name={name}
    />
  )
}

export default ControlledFormItem