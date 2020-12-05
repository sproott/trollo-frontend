import {
  BoardDocument,
  BoardQuery,
  Card,
  List,
  Maybe,
  TeamsDocument,
  TeamsQuery,
  useRenameListMutation,
  useRenameTeamMutation,
} from "../../../generated/graphql"
import { Draggable, Droppable } from "react-beautiful-dnd"
import DraggableCard from "./DraggableCard"
import React, { useState } from "react"
import { Button, Card as AntdCard, Col, Modal } from "antd"
import NewCardButton from "./NewCardButton"
import { DroppableType } from "../../constants/DroppableType"
import Box from "../common/Box"
import EditableText from "../common/form/EditableText"
import produce from "immer"

const DraggableDroppableList = ({
  boardId,
  list,
}: {
  boardId: string
  list: { __typename?: "List" } & Pick<List, "id" | "name" | "index"> & {
      cards?: Maybe<Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "index">>>
    }
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [rename, { data }] = useRenameListMutation()

  const onConfirm = async (newName: string) => {
    await rename({
      variables: {
        name: newName,
        listId: list.id,
      },
      update: (store, { data }) => {
        if (data.renameList.success && !data.renameList.exists) {
          const board = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })
          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(board, (x) => {
              x.board.lists.find((l) => l.id === list.id).name = newName
            }),
          })
        }
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
                    {[...list.cards]
                      .sort((c1, c2) => c1.index - c2.index)
                      .map((card) => (
                        <DraggableCard key={card.id} card={card} />
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
        footer={<></>}
      >
        <Box flex flexDirection="column" gap="15px">
          <EditableText
            label="Name: "
            text={list.name}
            onConfirm={onConfirm}
            containerVisible={modalVisible}
            error={data?.renameList.exists && "List with this name already exists"}
            success={data?.renameList.success}
          />
        </Box>
      </Modal>
    </>
  )
}

export default DraggableDroppableList
