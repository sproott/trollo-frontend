import React from "react"
import { Modal } from "antd"
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
      onOk={onOk}
      destroyOnClose
      okType={"danger"}
      okText="Delete"
    >
      <Div>{title}</Div>
    </Modal>
  )
}

export default ConfirmDeleteModal
