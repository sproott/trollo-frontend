import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const TextInput = (props: ControlledInputProps) => {
  return (
    <ControlledFormItem {...props}>
      <Input />
    </ControlledFormItem>
  )
}

export default TextInput
