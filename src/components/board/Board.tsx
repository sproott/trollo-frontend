import React, { useState } from "react"
import {
  BoardDocument,
  BoardQuery,
  TeamsDocument,
  TeamsQuery,
  useBoardQuery,
  useDeleteBoardMutation,
  useMoveCardMutation,
  useMoveListMutation,
  useRenameBoardMutation,
} from "../../../generated/graphql"
import { useRouter } from "next/router"
import Spinner from "../loading/Spinner"
import { Content } from "../common/page.styled"
import { H0 } from "../common/Text"
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd"
import DraggableDroppableList from "./DraggableDroppableList"
import produce from "immer"
import Box from "../common/Box"
import NewListButton from "./NewListButton"
import { EditOutlined } from "@ant-design/icons"
import EditableText from "../common/form/EditableText"
import { Button, Modal } from "antd"
import { DroppableType } from "../../constants/DroppableType"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"

const Board = ({ boardId }: { boardId: string }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const { data, error, loading } = useBoardQuery({ variables: { id: boardId } })
  const [moveCard] = useMoveCardMutation()
  const [moveList] = useMoveListMutation()
  const [rename, { data: renameMutationData }] = useRenameBoardMutation()
  const [deleteBoardMutate, { data: deleteMutationData }] = useDeleteBoardMutation()
  const router = useRouter()

  const onConfirm = async (newName: string) => {
    await rename({
      variables: {
        name: newName,
        boardId: data.board.id,
      },
      update: (store, { data }) => {
        if (data.renameBoard.success && !data.renameBoard.exists) {
          const board = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })
          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(board, (x) => {
              x.board.name = newName
            }),
          })
        }
      },
    })
  }

  const onDragEnd = async (result: DropResult, provided: ResponderProvided) => {
    const { source, destination, draggableId, type } = result
    if (type === DroppableType.LIST) {
      if (
        !!destination &&
        !(destination.droppableId === source.droppableId && source.index === destination.index)
      ) {
        await moveCard({
          variables: {
            cardId: draggableId,
            listId:
              destination.droppableId !== source.droppableId ? destination.droppableId : undefined,
            destinationIndex: destination.index,
          },
          optimisticResponse: { moveCard: true },
          update: (store, { data }) => {
            if (data.moveCard) {
              const board = store.readQuery<BoardQuery>({
                query: BoardDocument,
                variables: { id: boardId },
              })

              store.writeQuery<BoardQuery>({
                query: BoardDocument,
                data: produce(board, (x) => {
                  // find the source and destination lists
                  const sourceList = x.board.lists.find((list) => list.id === source.droppableId)
                  const destinationList =
                    source.droppableId === destination.droppableId
                      ? sourceList
                      : x.board.lists.find((list) => list.id === destination.droppableId)

                  // remove card from source
                  const [card] = sourceList.cards.splice(source.index, 1)

                  // insert card in destination
                  destinationList.cards.splice(destination.index, 0, card)

                  // reindex cards in lists
                  sourceList.cards.forEach((card, index) => (card.index = index))
                  destinationList.cards.forEach((card, index) => (card.index = index))
                }),
              })
            }
          },
        })
      }
    } else {
      if (
        !!destination &&
        !(
          destination.droppableId === source.droppableId &&
          result.source.index === destination.index
        )
      ) {
        await moveList({
          variables: {
            listId: draggableId,
            destinationIndex: destination.index,
          },
          optimisticResponse: { moveList: true },
          update: (store, { data }) => {
            if (data.moveList) {
              const board = store.readQuery<BoardQuery>({
                query: BoardDocument,
                variables: { id: boardId },
              })

              store.writeQuery<BoardQuery>({
                query: BoardDocument,
                data: produce(board, (x) => {
                  // remove list from source
                  const [list] = x.board.lists.splice(source.index, 1)

                  // insert list in destination
                  x.board.lists.splice(destination.index, 0, list)

                  // reindex lists
                  x.board.lists.forEach((list, index) => (list.index = index))
                }),
              })
            }
          },
        })
      }
    }
  }

  const deleteBoard = async () => {
    await deleteBoardMutate({
      variables: { id: boardId },
      update: (store, { data }) => {
        if (data.deleteBoard) {
          const teams = store.readQuery<TeamsQuery>({ query: TeamsDocument })
          store.writeQuery<TeamsQuery>({
            query: TeamsDocument,
            data: produce(teams, (x) => {
              const team = x.currentUser.owns
                .map((p) => p.team)
                .find((t) => t.boards.findIndex((b) => b.id === boardId) !== -1)
              team.boards.splice(
                team.boards.findIndex((b) => b.id === boardId),
                1
              )
            }),
          })
        }

        setDeleted(true)
      },
    })
    setConfirmationVisible(false)
    setModalVisible(false)
  }

  if ((!!deleteMutationData?.deleteBoard && deleted) || error || (!loading && !data)) {
    router.replace("/")
  }

  return !data ? (
    <Spinner />
  ) : (
    <Content>
      <Box flex justifyContent="space-between">
        <Box flex justifyContent="space-between" alignItems="center" gap="20px">
          <H0>{data.board.name}</H0>
          {data.board.isOwn && (
            <EditOutlined
              onClick={setModalVisible.bind(this, true)}
              style={{ padding: "15px 20px" }}
            />
          )}
        </Box>
        <NewListButton board={data.board} />
      </Box>
      <div
        style={{ flex: 1, display: "flex", overflow: "auto", height: "100%", paddingTop: "10px" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={data.board.id} type={DroppableType.BOARD} direction="horizontal">
            {(provided, snapshot) => (
              <Box flex fullWidth {...provided.droppableProps} ref={provided.innerRef}>
                {data.board.lists.map((list) => (
                  <DraggableDroppableList boardId={data.board.id} key={list.id} list={list} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal
        visible={modalVisible}
        title={`Edit board ${data.board.name}`}
        onCancel={setModalVisible.bind(this, false)}
        footer={
          <Button type="primary" danger onClick={setConfirmationVisible.bind(this, true)}>
            Delete board
          </Button>
        }
      >
        <Box flex flexDirection="column" gap="15px">
          <EditableText
            label="Name"
            text={data.board.name}
            onConfirm={onConfirm}
            containerVisible={modalVisible}
            error={renameMutationData?.renameBoard.exists && "Board with this name already exists"}
            success={renameMutationData?.renameBoard.success}
          />
        </Box>
      </Modal>
      <ConfirmDeleteModal
        title="Do you really want to delete this board?"
        visible={confirmationVisible}
        onCancel={setConfirmationVisible.bind(this, false)}
        onOk={deleteBoard}
      />
    </Content>
  )
}

export default Board
