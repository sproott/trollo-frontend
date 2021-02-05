import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"

import { Input } from "antd"
import React from "react"

const TextInput = <TInput extends Record<string, unknown>>(props: ControlledInputProps<TInput>) => {
  return (
    <ControlledFormItem {...props}>
      <Input maxLength={props.maxLength ?? 50} />
    </ControlledFormItem>
  )
}

export default TextInput
