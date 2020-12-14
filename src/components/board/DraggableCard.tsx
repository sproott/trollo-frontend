import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import {
  BoardQueryCardFragment,
  ParticipantUserFragment,
  useDeleteCardMutation,
  useRenameCardMutation,
  useUpdateCardDescriptionMutation,
} from "../../../generated/graphql"
import { LineClamp } from "../common/Text"
import { CardInner } from "./board.styled"
import { Button, Modal } from "antd"
import Box from "../common/Box"
import EditableText from "../common/form/EditableText"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"
import EditableTextArea from "../common/form/EditableTextArea"
import AssigneeSelect from "./AssigneeSelect"

const DraggableCard = ({
  card,
  participants,
}: {
  card: BoardQueryCardFragment
  participants: ParticipantUserFragment[]
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [renameMutate, { data: renameData }] = useRenameCardMutation()
  const [
    updateDescriptionMutate,
    { data: updateDescriptionData },
  ] = useUpdateCardDescriptionMutation()
  const [deleteCardMutate] = useDeleteCardMutation()

  const deleteCard = async () => {
    await deleteCardMutate({
      variables: { id: card.id },
    })
    setConfirmationVisible(false)
    setModalVisible(false)
  }
  const rename = async (newName: string) => {
    await renameMutate({
      variables: {
        name: newName,
        cardId: card.id,
      },
    })
  }
  const updateDescription = async (newDescription: string) => {
    await updateDescriptionMutate({
      variables: {
        description: newDescription,
        cardId: card.id,
      },
    })
  }

  return (
    <>
      <Draggable draggableId={card.id} index={card.index}>
        {(provided, snapshot) => (
          <CardInner
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              ...provided.draggableProps.style,
            }}
            isDragging={snapshot.isDragging}
            onClick={setModalVisible.bind(this, true)}
          >
            <LineClamp>{card.name}</LineClamp>
          </CardInner>
        )}
      </Draggable>
      <Modal
        visible={modalVisible}
        title={`Edit card ${card.name}`}
        onCancel={setModalVisible.bind(this, false)}
        footer={
          <Button type="primary" danger onClick={setConfirmationVisible.bind(this, true)}>
            Delete card
          </Button>
        }
        destroyOnClose
      >
        <Box flex flexDirection="column" gap="15px">
          <EditableText
            label="Name"
            text={card.name}
            onConfirm={rename}
            error={renameData?.renameCard.exists && "Card with this name already exists"}
            success={renameData?.renameCard.success}
          />
          <EditableTextArea
            label="Description"
            text={card.description}
            onConfirm={updateDescription}
            success={updateDescriptionData?.updateCardDescription}
            optional
          />
          <AssigneeSelect assignee={card.assignee} cardId={card.id} participants={participants} />
        </Box>
      </Modal>
      <ConfirmDeleteModal
        title="Do you really want to delete this card?"
        visible={confirmationVisible}
        onCancel={setConfirmationVisible.bind(this, false)}
        onOk={deleteCard}
      />
    </>
  )
}

export default DraggableCard
