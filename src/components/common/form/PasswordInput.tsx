import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"

import { Input } from "antd"
import React from "react"

const PasswordInput = <TInput extends Record<string, unknown>>(
  props: ControlledInputProps<TInput>
) => {
  return (
    <ControlledFormItem {...props}>
      <Input.Password maxLength={props.maxLength} />
    </ControlledFormItem>
  )
}

export default PasswordInput
