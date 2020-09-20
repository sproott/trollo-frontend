import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const PasswordInput = (props: ControlledInputProps) => {
  return (
    <ControlledFormItem {...props}>
      <Input.Password />
    </ControlledFormItem>
  )
}

export default PasswordInput
