import { Button, Card, Col, Modal } from "antd"
import { Div, H3 } from "../common/util/Text"
import {
  ParticipantUserFragment,
  TeamInfoFragment,
  useCurrentUserQuery,
  useDeleteTeamMutation,
  useLeaveTeamMutation,
  useRemoveUserMutation,
  useRenameTeamMutation,
} from "../../../generated/graphql"
import React, { useState } from "react"

import AddUser from "./AddUser"
import Avatar from "../common/Avatar"
import { BoardGrid } from "./teams.styled"
import BoardInfo from "./BoardInfo"
import Box from "../common/util/Box"
import { CloseOutlined } from "@ant-design/icons"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"
import CreateInviteLink from "./CreateInviteLink"
import EditableText from "../common/form/EditableText"
import NewBoardButton from "./NewBoardButton"
import theme from "../../style/theme"

function TeamInfo({ team, isOwn }: { team: TeamInfoFragment; isOwn: boolean }) {
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [leaveConfirmationVisible, setLeaveConfirmationVisible] = useState(false)
  const [rename, { data }] = useRenameTeamMutation()
  const [removeUserMutate] = useRemoveUserMutation()
  const [deleteTeamMutate] = useDeleteTeamMutation()
  const [leaveTeamMutate] = useLeaveTeamMutation()
  const {
    data: {
      currentUser: { id: userId },
    },
  } = useCurrentUserQuery()
  const renameTeam = async (newName: string) => {
    await rename({
      variables: {
        name: newName,
        teamId: team.id,
      },
    })
  }
  const removeUser = async (userId: string) => {
    await removeUserMutate({
      variables: {
        userId,
        teamId: team.id,
      },
    })
  }
  const leaveTeam = async () => {
    await leaveTeamMutate({
      variables: { teamId: team.id },
    })
  }
  const deleteTeam = async () => {
    await deleteTeamMutate({
      variables: {
        id: team.id,
      },
    })
    setConfirmationVisible(false)
    setEditModalVisible(false)
  }
  const generateUserList = (participants: ParticipantUserFragment[]) =>
    participants
      .flatMap((p) => p.user)
      .sort((u1, u2) => u1.username.localeCompare(u2.username))
      .map((user) => {
        return (
          <Box flex justifyContent="space-between" alignItems="center" key={user.id}>
            <Box flex alignItems="center" gap="10px">
              <Avatar
                username={user.username}
                backgroundColor={theme.blue.primary}
                color="white"
                pointer
              />
              <Box flex gap="5px">
                <Div>{user.username}</Div>
                {userId === user.id && <Div color="grey">(you)</Div>}
              </Box>
            </Box>
            {isOwn && userId !== user.id && (
              <CloseOutlined onClick={removeUser.bind(this, user.id)} />
            )}
          </Box>
        )
      })

  return (
    <>
      <Card
        title={
          <div style={{ cursor: "pointer" }} onClick={setEditModalVisible.bind(this, true)}>
            {team.name}
          </div>
        }
        style={{ marginBottom: "10px" }}
      >
        <BoardGrid style={{ padding: "10px 10px 0 10px" }}>
          {[...team.boards]
            .sort((b1, b2) => b1.name.localeCompare(b2.name))
            .map((board) => {
              return <BoardInfo name={board.name} id={board.id} key={board.id} />
            })}
          {isOwn && <NewBoardButton team={team} />}
        </BoardGrid>
      </Card>
      <Modal
        visible={editModalVisible}
        title={`Edit team ${team.name}`}
        onCancel={setEditModalVisible.bind(this, false)}
        footer={
          isOwn ? (
            <Button type="primary" danger onClick={setConfirmationVisible.bind(this, true)}>
              Delete team
            </Button>
          ) : (
            <Button type="primary" danger onClick={setLeaveConfirmationVisible.bind(this, true)}>
              Leave team
            </Button>
          )
        }
        destroyOnClose
      >
        <Box flex flexDirection="column" gap="15px">
          {isOwn && (
            <EditableText
              label="Name"
              text={team.name}
              onConfirm={renameTeam}
              error={data?.renameTeam.exists && "Team with this name already exists"}
              success={data?.renameTeam.success}
            />
          )}
          <Box flex flexDirection="column" gap="5px">
            <H3>Admin:</H3>
            <Box flex flexDirection="column" gap="5px">
              <Col span={12}>
                <Box flex flexDirection="column" gap="5px">
                  {generateUserList(team.participants.filter((p) => p.owner))}
                </Box>
              </Col>
            </Box>
            <H3>Users:</H3>
            <Box flex flexDirection="column" gap="5px">
              <Col span={12}>
                <Box flex flexDirection="column" gap="5px">
                  {generateUserList(team.participants.filter((p) => !p.owner))}
                </Box>
              </Col>
            </Box>
            {isOwn && (
              <>
                <AddUser teamId={team.id} />
                <CreateInviteLink teamId={team.id} />
              </>
            )}
          </Box>
        </Box>
      </Modal>
      <ConfirmDeleteModal
        title="Do you really want to delete this team?"
        visible={confirmationVisible}
        onCancel={setConfirmationVisible.bind(this, false)}
        onOk={deleteTeam}
      />
      <ConfirmDeleteModal
        title={"Do you really want to leave this team?"}
        visible={leaveConfirmationVisible}
        onCancel={setLeaveConfirmationVisible.bind(this, false)}
        okButtonText="Leave"
        onOk={leaveTeam}
      />
    </>
  )
}

export default TeamInfo
