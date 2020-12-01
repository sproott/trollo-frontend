import React from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const PasswordInput = (props: ControlledInputProps & { maxLength?: number }) => {
  return (
    <ControlledFormItem {...props}>
      <Input.Password maxLength={props.maxLength} />
    </ControlledFormItem>
  )
}

export default PasswordInput
