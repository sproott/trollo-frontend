import React, { useState } from "react"
import { CloseOutlined, EditOutlined } from "@ant-design/icons"
import { BoardGrid } from "./teams.styled"
import BoardInfo from "./BoardInfo"
import NewBoardButton from "./NewBoardButton"
import { Card, Col, Modal } from "antd"
import {
  TeamInfoFragment,
  TeamsDocument,
  TeamsQuery,
  useCurrentUserQuery,
  useRemoveUserMutation,
  useRenameTeamMutation,
} from "../../../generated/graphql"
import EditableText from "../common/form/EditableText"
import produce from "immer"
import Box from "../common/Box"
import Avatar from "../common/Avatar"
import { H3, Div } from "../common/Text"
import theme from "../../style/theme"
import AddUser from "./AddUser"

function TeamInfo({
  team,
  isOwn,
}: {
  team: { __typename?: "Team" } & TeamInfoFragment
  isOwn: boolean
}) {
  const [modalVisible, setModalVisible] = useState(false)
  const [rename, { data }] = useRenameTeamMutation()
  const [removeUserMutate] = useRemoveUserMutation()
  const {
    data: {
      currentUser: { id: userId },
    },
  } = useCurrentUserQuery()
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
  const removeUser = (userId: string) => {
    removeUserMutate({
      variables: {
        userId,
        teamId: team.id,
      },
      update: (store, { data }) => {
        if (!!data.removeUser) {
          const teams = store.readQuery<TeamsQuery>({ query: TeamsDocument })

          store.writeQuery<TeamsQuery>({
            query: TeamsDocument,
            data: produce(teams, (x) => {
              const participants = x.currentUser.owns
                .flatMap((p) => p.team)
                .find((t) => t.id === team.id).participants
              participants.splice(
                participants.findIndex((p) => p.user.id === userId),
                1
              )
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
        <Box flex flexDirection="column" gap="15px">
          <EditableText
            label="Name: "
            text={team.name}
            onConfirm={onConfirm}
            containerVisible={modalVisible}
            error={data?.renameTeam.exists && "Team with this name already exists"}
            success={data?.renameTeam.success}
          />
          <Box flex flexDirection="column" gap="5px">
            <H3>Users:</H3>
            {team.participants.length > 1 && (
              <Box flex flexDirection="column" gap="5px">
                <Col span={12}>
                  <Box flex flexDirection="column" gap="5px">
                    {team.participants
                      .flatMap((p) => p.user)
                      .sort((user1, user2) => user1.username.localeCompare(user2.username))
                      .map((user) => {
                        return (
                          user.id !== userId && (
                            <Box
                              flex
                              justifyContent="space-between"
                              alignItems="center"
                              key={user.id}
                            >
                              <Box flex alignItems="center" gap="10px">
                                <Avatar
                                  username={user.username}
                                  backgroundColor={theme.blue.primary}
                                  color="white"
                                  pointer
                                />
                                <Div>{user.username}</Div>
                              </Box>
                              <CloseOutlined onClick={removeUser.bind(this, user.id)} />
                            </Box>
                          )
                        )
                      })}
                  </Box>
                </Col>
              </Box>
            )}
            <AddUser teamId={team.id} containerVisible={modalVisible} />
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default TeamInfo
