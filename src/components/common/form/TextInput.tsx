import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const TextInput = (props: ControlledInputProps & { maxLength?: number }) => {
  return (
    <ControlledFormItem {...props}>
      <Input maxLength={props.maxLength ?? 50} />
    </ControlledFormItem>
  )
}

export default TextInput
