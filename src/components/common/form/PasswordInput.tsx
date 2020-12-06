import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const PasswordInput = <TInput extends object>(
  props: ControlledInputProps<TInput> & { maxLength?: number }
) => {
  return (
    <ControlledFormItem {...props}>
      <Input.Password maxLength={props.maxLength} />
    </ControlledFormItem>
  )
}

export default PasswordInput
