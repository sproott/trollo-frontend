import React, { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import {
  BoardDocument,
  BoardQuery,
  Card,
  useRenameCardMutation,
  useRenameListMutation,
} from "../../../generated/graphql"
import { LineClamp } from "../common/Text"
import { CardInner } from "./board.styled"
import { Modal, Tooltip } from "antd"
import { BoardButton } from "../teams/teams.styled"
import Box from "../common/Box"
import EditableText from "../common/form/EditableText"
import produce from "immer"

const DraggableCard = ({
  card,
  boardId,
}: {
  card: { __typename?: "Card" } & Pick<Card, "name" | "id" | "index">
  boardId: string
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [rename, { data }] = useRenameCardMutation()

  const onConfirm = async (newName: string) => {
    await rename({
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
        footer={<></>}
      >
        <Box flex flexDirection="column" gap="15px">
          <EditableText
            label="Name: "
            text={card.name}
            onConfirm={onConfirm}
            containerVisible={modalVisible}
            error={data?.renameCard.exists && "Card with this name already exists"}
            success={data?.renameCard.success}
          />
        </Box>
      </Modal>
    </>
  )
}

export default DraggableCard
