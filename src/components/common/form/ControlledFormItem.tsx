import { Control, Controller } from "react-hook-form"
import React, { ReactElement } from "react"
import { Form } from "antd"

export type ControlledInputProps = {
  name: string
  label?: string
  error?: string
  control: Control
}

interface ControlledInputWithChildrenProps extends ControlledInputProps {
  children: ReactElement
}

const ControlledFormItem = ({
  name,
  label,
  control,
  error,
  children,
}: ControlledInputWithChildrenProps) => {
  return (
    <Controller
      render={(props) => (
        <Form.Item
          label={label}
          validateStatus={!!error && "error"}
          help={error}
          style={{ marginBottom: "0" }}
        >
          {React.cloneElement(children, { ...props })}
        </Form.Item>
      )}
      control={control}
      name={name}
    />
  )
}

export default ControlledFormItem
