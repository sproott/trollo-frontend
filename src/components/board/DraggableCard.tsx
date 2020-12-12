import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import {
  BoardDocument,
  BoardQuery,
  BoardQueryCardFragment,
  ParticipantUserFragment,
  useDeleteCardMutation,
  useRenameCardMutation,
  useUpdateCardDescriptionMutation,
} from "../../../generated/graphql"
import { LineClamp } from "../common/Text"
import { CardInner } from "./board.styled"
import { Button, Modal, Select } from "antd"
import Box from "../common/Box"
import EditableText from "../common/form/EditableText"
import produce from "immer"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"
import EditableTextArea from "../common/form/EditableTextArea"
import AssigneeSelect from "./AssigneeSelect"

const DraggableCard = ({
  card,
  boardId,
  participants,
}: {
  card: BoardQueryCardFragment
  boardId: string
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
      update: (store, { data }) => {
        if (data.deleteCard) {
          const board = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })
          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(board, (x) => {
              const cards = x.board.lists.find(
                (l) => l.cards.findIndex((c) => c.id === card.id) !== -1
              ).cards
              cards.splice(
                cards.findIndex((c) => c.id === card.id),
                1
              )
              cards.forEach((card, index) => (card.index = index))
            }),
          })
        }
      },
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
      update: (store, { data }) => {
        if (data.renameCard.success && !data.renameCard.exists) {
          const board = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })
          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(board, (x) => {
              x.board.lists.flatMap((l) => l.cards).find((c) => c.id === card.id).name = newName
            }),
          })
        }
      },
    })
  }
  const updateDescription = async (newDescription: string) => {
    await updateDescriptionMutate({
      variables: {
        description: newDescription,
        cardId: card.id,
      },
      update: (store, { data }) => {
        if (data.updateCardDescription) {
          const board = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })
          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(board, (x) => {
              x.board.lists
                .flatMap((l) => l.cards)
                .find((c) => c.id === card.id).description = newDescription
            }),
          })
        }
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
          <AssigneeSelect
            assignee={card.assignee}
            boardId={boardId}
            cardId={card.id}
            participants={participants}
          />
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
