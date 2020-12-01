import React, { useState } from "react"
import { EditOutlined } from "@ant-design/icons"
import { BoardGrid } from "./teams.styled"
import BoardInfo from "./BoardInfo"
import NewBoardButton from "./NewBoardButton"
import { Card, Modal } from "antd"
import { TeamInfoFragment } from "../../../generated/graphql"
import EditableText from "../common/form/EditableText"

function TeamInfo({
  team,
  isOwn,
}: {
  team: { __typename?: "Team" } & TeamInfoFragment
  isOwn: boolean
}) {
  const [modalVisible, setModalVisible] = useState(false)
  const showModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <Card
        title={team.name}
        style={{ marginBottom: "10px" }}
        extra={isOwn && <EditOutlined onClick={showModal} style={{ padding: "0 20px" }} />}
      >
        <BoardGrid style={{ padding: "10px 10px 0 10px" }}>
          {team.boards?.map((board) => {
            return <BoardInfo name={board.name} id={board.id} key={board.id} />
          })}
          {isOwn && <NewBoardButton team={team} />}
        </BoardGrid>
      </Card>
      <Modal visible={modalVisible} title={`Edit team ${team.name}`} onCancel={closeModal}>
        <div>Name:</div>
        <EditableText text={team.name} />
      </Modal>
    </>
  )
}

export default TeamInfo
