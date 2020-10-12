import React from "react"
import { BoardButton, CreateBoardButton } from "./teams.styled"
import { PlusOutlined } from "@ant-design/icons"
import { Centered } from "../common/Centered"

const NewBoardButton = () => {
  return (
    <CreateBoardButton>
      <Centered style={{ height: "100%" }}>
        <PlusOutlined />
      </Centered>
    </CreateBoardButton>
  )
}

export default NewBoardButton
