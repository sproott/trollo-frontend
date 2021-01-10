import {
  BoardQueryCardFragment,
  ParticipantUserFragment,
  useDeleteCardMutation,
  useRenameCardMutation,
  useUpdateCardDescriptionMutation,
} from "../../../generated/graphql"
import { Button, Modal } from "antd"
import { CardInner, FlairBox } from "./board.styled"
import { Div, LineClamp } from "../common/util/Text"
import React, { useContext, useState } from "react"

import AssigneeSelect from "./AssigneeSelect"
import { BoardContext } from "./Board"
import Box from "../common/util/Box"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"
import { Draggable } from "react-beautiful-dnd"
import { EditFlairs } from "./EditFlairs"
import EditableText from "../common/form/EditableText"
import EditableTextArea from "../common/form/EditableTextArea"
import { FlairFromFragment } from "./FlairFromFragment"

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
  const { flairs: teamFlairs } = useContext(BoardContext)

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
          <Box flex alignItems="center" gap="10px">
            <Div>Flairs: </Div>
            <EditFlairs cardFlairs={card.flairs} teamFlairs={teamFlairs} />
          </Box>
          <FlairBox>
            {[...card.flairs]
              .sort((f1, f2) => f1.name.localeCompare(f2.name))
              .map((f) => (
                <FlairFromFragment key={f.id} flair={f} nonEditable />
              ))}
          </FlairBox>
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
