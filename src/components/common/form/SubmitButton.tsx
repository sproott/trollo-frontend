import React from "react"
import { Button, Form } from "antd"

const SubmitButton = ({ label, style }: { label: string; style?: React.CSSProperties }) => {
  return (
    <Form.Item style={style}>
      <Button type="primary" htmlType="submit">
        {label}
      </Button>
    </Form.Item>
  )
}

export default SubmitButton
