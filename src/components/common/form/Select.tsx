import React, { CSSProperties } from "react"
import { Select as _Select } from "antd"

export type SelectItem = {
  value: string
  label: string
}

const Select = ({
  defaultValue,
  selectItems,
  onChange,
  style,
}: {
  defaultValue: string
  selectItems: SelectItem[]
  onChange: (value: string) => void
  style?: CSSProperties
}) => {
  return (
    <_Select defaultValue={defaultValue} onChange={onChange} style={style}>
      {selectItems.map((selectItem) => (
        <_Select.Option key={selectItem.value} value={selectItem.value}>
          {selectItem.label}
        </_Select.Option>
      ))}
    </_Select>
  )
}

export default Select
