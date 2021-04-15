import React, { CSSProperties } from "react"
import ControlledFormItem, { ControlledInputProps } from "./ControlledFormItem"
import { Input } from "antd"

const { TextArea: _TextArea } = Input

const TextArea = <TInput extends object>(
  props: ControlledInputProps<TInput> & {
    maxLength?: number
    onPressEnter?: () => void
    style?: CSSProperties
  }
) => {
  return (
    <ControlledFormItem {...props} style={props.style}>
      <_TextArea maxLength={props.maxLength ?? 50} rows={4} onPressEnter={props.onPressEnter} />
    </ControlledFormItem>
  )
}

export default TextArea
