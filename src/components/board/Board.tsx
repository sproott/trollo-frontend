import React from "react"
import {
  BoardDocument,
  BoardQuery,
  useBoardQuery,
  useMoveCardMutation,
} from "../../../generated/graphql"
import { useRouter } from "next/router"
import Spinner from "../loading/Spinner"
import { Content } from "../common/page.styled"
import { H1 } from "../common/Text"
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd"
import DroppableList from "./DroppableList"
import produce from "immer"
import Box from "../common/Box"

const Board = ({ boardId }: { boardId: string }) => {
  const { data, error, loading } = useBoardQuery({ variables: { id: boardId } })
  const [moveCard] = useMoveCardMutation()
  const router = useRouter()

  const onDragEnd = async (result: DropResult, provided: ResponderProvided) => {
    console.log(result)
    const { source, destination, draggableId } = result
    if (
      !!destination &&
      !(destination.droppableId === source.droppableId && result.source.index === destination.index)
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
          const board = store.readQuery<BoardQuery>({
            query: BoardDocument,
            variables: { id: boardId },
          })

          store.writeQuery<BoardQuery>({
            query: BoardDocument,
            data: produce(board, (x) => {
              const sourceList = x.board.lists.find((list) => list.id === source.droppableId)
              const [card] = sourceList.cards.splice(source.index, 1)
              const destinationList = x.board.lists.find(
                (list) => list.id === destination.droppableId
              )
              card.index = result.destination.index
              destinationList.cards.splice(destination.index, 0, card)

              // reindex lists
              sourceList.cards.forEach((card, index) => (card.index = index))
              destinationList.cards.forEach((card, index) => (card.index = index))
            }),
          })
        },
      })
    }
  }

  if (!!error) {
    router.replace("/")
  }

  return loading ? (
    <Spinner />
  ) : (
    <Content>
      <H1>General</H1>
      <div
        style={{ flex: 1, display: "flex", overflow: "auto", height: "100%", paddingTop: "10px" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Box flex fullWidth>
            {data.board.lists.map((list) => (
              <DroppableList key={list.id} list={list} />
            ))}
          </Box>
        </DragDropContext>
      </div>
    </Content>
  )
}

export default Board
