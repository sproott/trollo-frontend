import React from "react"
import { Button, Modal } from "antd"
import { Div } from "./Text"

function ConfirmDeleteModal({
  title,
  visible,
  onCancel,
  onOk,
}: {
  title: string
  visible: boolean
  onCancel: () => void
  onOk: () => void
}) {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      footer={
        <>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onOk} type="primary" danger>
            Delete
          </Button>
        </>
      }
    >
      <Div>{title}</Div>
    </Modal>
  )
}

export default ConfirmDeleteModal
