import React from "react"
import { Button, Form } from "antd"

const SubmitButton = ({ label }: { label: string }) => {
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit">
        {label}
      </Button>
    </Form.Item>
  )
}

export default SubmitButton
