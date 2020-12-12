import {
  BoardQueryBoardFragment,
  BoardQueryListFragment,
  useDeleteListMutation,
  useRenameListMutation,
} from "../../../generated/graphql"
import { Draggable, Droppable } from "react-beautiful-dnd"
import DraggableCard from "./DraggableCard"
import React, { useState } from "react"
import { Button, Card as AntdCard, Col, Modal } from "antd"
import NewCardButton from "./NewCardButton"
import { DroppableType } from "../../constants/DroppableType"
import Box from "../common/Box"
import EditableText from "../common/form/EditableText"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"

const DraggableDroppableList = ({
  board,
  list,
}: {
  board: BoardQueryBoardFragment
  list: BoardQueryListFragment
}) => {
  const { id: boardId } = board
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [rename, { data }] = useRenameListMutation()
  const [deleteListMutate] = useDeleteListMutation()

  const deleteList = async () => {
    await deleteListMutate({
      variables: { id: list.id },
    })
    setConfirmationVisible(false)
    setModalVisible(false)
  }
  const onConfirm = async (newName: string) => {
    await rename({
      variables: {
        name: newName,
        listId: list.id,
      },
    })
  }

  return (
    <>
      <Draggable draggableId={list.id} index={list.index}>
        {(provided, snapshot) => (
          <Col
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
            }}
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
          >
            <AntdCard
              title={
                <div {...provided.dragHandleProps} onClick={setModalVisible.bind(this, true)}>
                  {list.name}
                </div>
              }
              style={{ margin: "0 4px" }}
            >
              <Droppable droppableId={list.id} type={DroppableType.LIST}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      minHeight: "1px",
                    }}
                  >
                    {list.cards.map((card) => (
                      <DraggableCard
                        key={card.id}
                        card={card}
                        boardId={boardId}
                        participants={board.team.participants}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <NewCardButton boardId={boardId} list={list} />
            </AntdCard>
          </Col>
        )}
      </Draggable>
      <Modal
        visible={modalVisible}
        title={`Edit list ${list.name}`}
        onCancel={setModalVisible.bind(this, false)}
        footer={
          <Button type="primary" danger onClick={setConfirmationVisible.bind(this, true)}>
            Delete list
          </Button>
        }
      >
        <Box flex flexDirection="column" gap="15px">
          <EditableText
            label="Name"
            text={list.name}
            onConfirm={onConfirm}
            error={data?.renameList.exists && "List with this name already exists"}
            success={data?.renameList.success}
          />
        </Box>
      </Modal>
      <ConfirmDeleteModal
        title="Do you really want to delete this list?"
        visible={confirmationVisible}
        onCancel={setConfirmationVisible.bind(this, false)}
        onOk={deleteList}
      />
    </>
  )
}

export default DraggableDroppableList
