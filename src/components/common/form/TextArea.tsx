import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const { TextArea } = Input

const TextInput = <TInput extends object>(
  props: ControlledInputProps<TInput> & { maxLength?: number }
) => {
  return (
    <ControlledFormItem {...props}>
      <TextArea maxLength={props.maxLength ?? 50} rows={4} />
    </ControlledFormItem>
  )
}

export default TextInput
