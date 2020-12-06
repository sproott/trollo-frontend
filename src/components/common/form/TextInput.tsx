import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const TextInput = <TInput extends object>(
  props: ControlledInputProps<TInput> & { maxLength?: number }
) => {
  return (
    <ControlledFormItem {...props}>
      <Input maxLength={props.maxLength ?? 50} />
    </ControlledFormItem>
  )
}

export default TextInput
