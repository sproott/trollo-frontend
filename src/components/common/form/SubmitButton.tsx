import React from "react"
import { Button, Form } from "antd"

const SubmitButton = ({ label, loading = false }: { label: string; loading: boolean }) => {
  return (
    <Form.Item>
      <Button loading={loading} type="primary" htmlType="submit">
        {label}
      </Button>
    </Form.Item>
  )
}

export default SubmitButton
