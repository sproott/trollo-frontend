import React, { useState } from "react"
import { EditOutlined } from "@ant-design/icons"
import { BoardGrid } from "./teams.styled"
import BoardInfo from "./BoardInfo"
import NewBoardButton from "./NewBoardButton"
import { Card, Modal } from "antd"
import {
  TeamInfoFragment,
  TeamsDocument,
  TeamsQuery,
  useRenameTeamMutation,
} from "../../../generated/graphql"
import EditableText from "../common/form/EditableText"
import produce from "immer"

function TeamInfo({
  team,
  isOwn,
}: {
  team: { __typename?: "Team" } & TeamInfoFragment
  isOwn: boolean
}) {
  const [modalVisible, setModalVisible] = useState(false)
  const [rename, { data }] = useRenameTeamMutation()
  const showModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }
  const onConfirm = async (newName: string) => {
    await rename({
      variables: {
        name: newName,
        teamId: team.id,
      },
      update: (store, { data }) => {
        if (data.renameTeam.success && !data.renameTeam.exists) {
          const teams = store.readQuery<TeamsQuery>({ query: TeamsDocument })
          store.writeQuery<TeamsQuery>({
            query: TeamsDocument,
            data: produce(teams, (x) => {
              x.currentUser.owns.flatMap((p) => p.team).find((t) => t.id === team.id).name = newName
            }),
          })
        }
      },
    })
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
      <Modal
        visible={modalVisible}
        title={`Edit team ${team.name}`}
        onCancel={closeModal}
        footer={<></>}
      >
        <EditableText
          label="Name: "
          text={team.name}
          onConfirm={onConfirm}
          containerVisible={modalVisible}
          error={data?.renameTeam.exists && "Team with this name already exists"}
          success={data?.renameTeam.success}
        />
      </Modal>
    </>
  )
}

export default TeamInfo
