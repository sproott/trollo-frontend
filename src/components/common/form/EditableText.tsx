import React, { useState } from "react"
import Box from "../Box"
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Input } from "antd"

function EditableText({ text }: { text: string }) {
  const [editing, setEditing] = useState(false)

  const edit = () => {
    setEditing(true)
  }
  const cancel = () => {
    setEditing(false)
  }

  return (
    <div>
      {!editing ? (
        <Box flex>
          {text}
          <EditOutlined onClick={edit} />
        </Box>
      ) : (
        <Box flex>
          <Input />
          <CheckOutlined />
          <CloseOutlined onClick={cancel} />
        </Box>
      )}
    </div>
  )
}

export default EditableText
