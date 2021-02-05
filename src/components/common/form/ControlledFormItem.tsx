import { Controller, FieldName, UseFormMethods } from "react-hook-form"
import React, { CSSProperties, ReactElement } from "react"

import { Form } from "antd"
import { RegisterOptions } from "react-hook-form/dist/types/validator"

export type ControlledInputProps<TInput> = {
  name: FieldName<TInput>
  label?: string
  error?: string
  optional?: boolean
  useFormMethods: UseFormMethods<TInput>
  rules?: RegisterOptions
  maxLength?: number
}

interface ControlledInputWithReactProps<TInput> extends ControlledInputProps<TInput> {
  children: ReactElement
  style?: CSSProperties
}

const ControlledFormItem = <TInput extends object>({
  name,
  label,
  useFormMethods,
  error,
  children,
  optional,
  rules,
  style,
  maxLength,
}: ControlledInputWithReactProps<TInput>) => {
  return (
    <Controller
      render={(props) => (
        <Form.Item
          label={!!label && `${label}: `}
          validateStatus={!!error && "error"}
          help={error}
          style={{ ...style, marginBottom: "0" }}
        >
          {React.cloneElement(children, { ...props })}
        </Form.Item>
      )}
      control={useFormMethods.control}
      rules={{
        maxLength: {
          value: maxLength ?? 50,
          message: `${label} cannot be longer than ${maxLength}`,
        },
        required: !optional && `${label} is required`,
        ...rules,
      }}
      name={name}
    />
  )
}

export default ControlledFormItem
