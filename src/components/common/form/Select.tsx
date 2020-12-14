import React, { CSSProperties } from "react"
import { Select as _Select } from "antd"

export type SelectItem = {
  value: string
  label: string
}

const Select = ({
  value,
  selectItems,
  onChange,
  style,
}: {
  value: string
  selectItems: SelectItem[]
  onChange: (value: string) => void
  style?: CSSProperties
}) => {
  return <_Select value={value} onChange={onChange} style={style} options={selectItems} />
}

export default Select
