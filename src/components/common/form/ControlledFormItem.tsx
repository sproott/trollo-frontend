import { Controller, FieldName, UseFormMethods } from "react-hook-form"
import React, { ReactElement } from "react"
import { Form } from "antd"
import { RegisterOptions } from "react-hook-form/dist/types/validator"

export type ControlledInputProps<TInput> = {
  name: FieldName<TInput>
  label?: string
  error?: string
  optional?: boolean
  useFormMethods: UseFormMethods<TInput>
  rules?: RegisterOptions
}

interface ControlledInputWithChildrenProps<TInput> extends ControlledInputProps<TInput> {
  children: ReactElement
}

const ControlledFormItem = <TInput extends object>({
  name,
  label,
  useFormMethods,
  error,
  children,
  optional,
  rules,
}: ControlledInputWithChildrenProps<TInput>) => {
  return (
    <Controller
      render={(props) => (
        <Form.Item
          label={!!label && label + ": "}
          validateStatus={!!error && "error"}
          help={error}
          style={{ marginBottom: "0" }}
        >
          {React.cloneElement(children, { ...props })}
        </Form.Item>
      )}
      control={useFormMethods.control}
      rules={{
        required: !optional && { value: true, message: `${label} is required` },
        ...rules,
      }}
      name={name}
    />
  )
}

export default ControlledFormItem
