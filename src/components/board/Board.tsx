import {
  BoardDeletedDocument,
  BoardDeletedSubscription,
  BoardDeletedSubscriptionVariables,
  BoardDocument,
  BoardQuery,
  BoardQueryCardFragment,
  BoardQueryListFragment,
  BoardQueryTeamFragment,
  BoardRenamedDocument,
  BoardRenamedSubscription,
  BoardRenamedSubscriptionVariables,
  CardCreatedDocument,
  CardCreatedSubscription,
  CardCreatedSubscriptionVariables,
  CardDeletedDocument,
  CardDeletedSubscription,
  CardDeletedSubscriptionVariables,
  CardMovedDocument,
  CardMovedSubscription,
  CardMovedSubscriptionVariables,
  CardUpdatedDocument,
  CardUpdatedSubscription,
  CardUpdatedSubscriptionVariables,
  CardUserAssignedDocument,
  CardUserAssignedSubscription,
  CardUserAssignedSubscriptionVariables,
  CardUserUnassignedDocument,
  CardUserUnassignedSubscription,
  CardUserUnassignedSubscriptionVariables,
  FlairCreatedDocument,
  FlairCreatedSubscription,
  FlairCreatedSubscriptionVariables,
  FlairDeletedDocument,
  FlairDeletedSubscription,
  FlairDeletedSubscriptionVariables,
  FlairUpdatedDocument,
  FlairUpdatedSubscription,
  FlairUpdatedSubscriptionVariables,
  ListCreatedDocument,
  ListCreatedSubscription,
  ListCreatedSubscriptionVariables,
  ListDeletedDocument,
  ListDeletedSubscription,
  ListDeletedSubscriptionVariables,
  ListMovedDocument,
  ListMovedSubscription,
  ListMovedSubscriptionVariables,
  ListRenamedDocument,
  ListRenamedSubscription,
  ListRenamedSubscriptionVariables,
  TeamUserAddedDocument,
  TeamUserAddedSubscription,
  TeamUserAddedSubscriptionVariables,
  TeamUserRemovedDocument,
  TeamUserRemovedSubscription,
  TeamUserRemovedSubscriptionVariables,
  useBoardQuery,
  useCurrentUserQuery,
  useDeleteBoardMutation,
  useMoveCardMutation,
  useMoveListMutation,
  useRenameBoardMutation,
} from "../../../generated/graphql"
import { Button, Modal } from "antd"
import { DragDropContext, DropResult, Droppable, ResponderProvided } from "react-beautiful-dnd"
import React, { createContext, useEffect, useState } from "react"
import { findNestedValue, removeNestedValue } from "../../lib/nestedPathUtil"

import { ArrowBack } from "./board.styled"
import Box from "../common/util/Box"
import ConfirmDeleteModal from "../common/ConfirmDeleteModal"
import { Content } from "../common/page.styled"
import DraggableDroppableList from "./DraggableDroppableList"
import { DroppableType } from "../../constants/DroppableType"
import { EditOutlined } from "@ant-design/icons"
import EditableText from "../common/form/EditableText"
import { H0 } from "../common/util/Text"
import Link from "next/link"
import NewListButton from "./NewListButton"
import Spinner from "../loading/Spinner"
import _ from "lodash"
import produce from "immer"
import { useRouter } from "next/router"

export const BoardContext = createContext<BoardQueryTeamFragment | undefined>(undefined)

const Board = ({ boardId }: { boardId: string }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const { data, error, loading, refetch, subscribeToMore } = useBoardQuery({
    variables: { id: boardId },
  })
  const {
    data: {
      currentUser: { id: userId },
    },
  } = useCurrentUserQuery()
  const [moveCard] = useMoveCardMutation()
  const [moveList] = useMoveListMutation()
  const [rename, { data: renameMutationData }] = useRenameBoardMutation()
  const [deleteBoardMutate, { data: deleteMutationData }] = useDeleteBoardMutation()
  const [subscribed, setSubscribed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (!subscribed && !!data?.board) {
      subscribeToMore<BoardRenamedSubscription, BoardRenamedSubscriptionVariables>({
        document: BoardRenamedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            Object.assign(x.board, data.boardRenamed)
          })
        },
      })
      subscribeToMore<BoardDeletedSubscription, BoardDeletedSubscriptionVariables>({
        document: BoardDeletedDocument,
        variables: { boardId },
        updateQuery: (prev, _) => {
          return produce(prev, (x) => {
            x.board = null
          })
        },
      })
      subscribeToMore<ListCreatedSubscription, ListCreatedSubscriptionVariables>({
        document: ListCreatedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            x.board.lists.push(data.listCreated as BoardQueryListFragment)
          })
        },
      })
      subscribeToMore<ListRenamedSubscription, ListRenamedSubscriptionVariables>({
        document: ListRenamedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            Object.assign(
              x.board.lists.find((l) => l.id === data.listRenamed.id),
              data.listRenamed
            )
          })
        },
      })
      subscribeToMore<ListMovedSubscription, ListMovedSubscriptionVariables>({
        document: ListMovedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            // remove list from source
            const [list] = x.board.lists.splice(data.listMoved.sourceIndex, 1)

            // insert list in destination
            x.board.lists.splice(data.listMoved.destinationIndex, 0, list)

            // reindex lists
            x.board.lists.forEach((list, index) => (list.index = index))
          })
        },
      })
      subscribeToMore<ListDeletedSubscription, ListDeletedSubscriptionVariables>({
        document: ListDeletedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            removeNestedValue(
              x,
              ["board", "lists"],
              (list: BoardQueryListFragment) => list.id === data.listDeleted
            )
            x.board.lists.forEach((list, index) => (list.index = index))
          })
        },
      })
      subscribeToMore<CardCreatedSubscription, CardCreatedSubscriptionVariables>({
        document: CardCreatedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            x.board.lists
              .find((l) => l.id === data.cardCreated.listId)
              .cards.push(data.cardCreated.card as BoardQueryCardFragment)
          })
        },
      })
      subscribeToMore<CardUpdatedSubscription, CardUpdatedSubscriptionVariables>({
        document: CardUpdatedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            Object.assign(
              findNestedValue(x.board, ["lists", "cards"], (c) => c.id === data.cardUpdated.id),
              data.cardUpdated
            )
          })
        },
      })
      subscribeToMore<CardMovedSubscription, CardMovedSubscriptionVariables>({
        document: CardMovedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            // find the source and destination lists
            const sourceList = x.board.lists.find(
              (l) => !!l.cards.find((c) => c.id === data.cardMoved.card.id)
            )

            const destinationList =
              sourceList.id === data.cardMoved.destinationListId
                ? sourceList
                : x.board.lists.find((list) => list.id === data.cardMoved.destinationListId)

            // remove card from source
            const [card] = sourceList.cards.splice(data.cardMoved.sourceIndex, 1)

            // insert card in destination
            destinationList.cards.splice(data.cardMoved.destinationIndex, 0, card)

            // reindex cards in lists
            sourceList.cards.forEach((card, index) => (card.index = index))
            destinationList.cards.forEach((card, index) => (card.index = index))
          })
        },
      })
      subscribeToMore<CardDeletedSubscription, CardDeletedSubscriptionVariables>({
        document: CardDeletedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            removeNestedValue(x.board, ["lists", "cards"], (c) => c.id === data.cardDeleted.cardId)
          })
        },
      })
      subscribeToMore<CardUserAssignedSubscription, CardUserAssignedSubscriptionVariables>({
        document: CardUserAssignedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            const card = findNestedValue(
              x.board,
              ["lists", "cards"],
              (c) => c.id === data.cardUserAssigned.cardId
            )
            card.assignee = data.cardUserAssigned.user
          })
        },
      })
      subscribeToMore<CardUserUnassignedSubscription, CardUserUnassignedSubscriptionVariables>({
        document: CardUserUnassignedDocument,
        variables: { boardId },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            const card = findNestedValue(
              x.board,
              ["lists", "cards"],
              (c) => c.id === data.cardUserUnassigned.cardId
            )
            card.assignee = null
          })
        },
      })
      subscribeToMore<TeamUserAddedSubscription, TeamUserAddedSubscriptionVariables>({
        document: TeamUserAddedDocument,
        variables: { teamId: data.board.team.id },
      })
      subscribeToMore<TeamUserRemovedSubscription, TeamUserRemovedSubscriptionVariables>({
        document: TeamUserRemovedDocument,
        variables: { teamId: data.board.team.id },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            if (userId === data.teamUserRemoved.userId) {
              x.board = null
            } else {
              removeNestedValue(
                x.board,
                ["team", "participants"],
                (p) => p.user.id === data.teamUserRemoved.userId
              )
              x.board.lists
                .flatMap((l) => l.cards)
                .forEach((c) => {
                  if (c.assignee?.id === data.teamUserRemoved.userId) c.assignee = null
                })
            }
          })
        },
      })
      subscribeToMore<FlairCreatedSubscription, FlairCreatedSubscriptionVariables>({
        document: FlairCreatedDocument,
        variables: { teamId: data.board.team.id },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            x.board.team.flairs.push(data.flairCreated)
          })
        },
      })
      subscribeToMore<FlairUpdatedSubscription, FlairUpdatedSubscriptionVariables>({
        document: FlairUpdatedDocument,
        variables: { teamId: data.board.team.id },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            Object.assign(
              x.board.team.flairs.find((f) => f.id === data.flairUpdated.id),
              data.flairUpdated
            )
            x.board.lists
              .flatMap((l) => l.cards)
              .flatMap((c) => c.flairs)
              .filter((f) => f.id === data.flairUpdated.id)
              .forEach((f) => Object.assign(f, data.flairUpdated))
          })
        },
      })
      subscribeToMore<FlairDeletedSubscription, FlairDeletedSubscriptionVariables>({
        document: FlairDeletedDocument,
        variables: { teamId: data.board.team.id },
        updateQuery: (prev, { subscriptionData: { data } }) => {
          return produce(prev, (x) => {
            _.remove(x.board.team.flairs, (f) => f.id === data.flairDeleted.flairId)
          })
        },
      })
      setSubscribed(true)
    }
  }, [data])

  const renameBoard = async (newName: string) => {
    await rename({
      variables: {
        name: newName,
        boardId: data.board.id,
      },
    })
  }
  const onDragEnd = async (result: DropResult, _: ResponderProvided) => {
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
    })
    setConfirmationVisible(false)
    setModalVisible(false)
    setDeleted(true)
  }

  if ((!!deleteMutationData?.deleteBoard && deleted) || error || (!loading && !data?.board)) {
    router.replace("/")
  }

  return !data?.board ? (
    <Spinner />
  ) : (
    <BoardContext.Provider value={data.board.team}>
      <Content>
        <Box flex justifyContent="space-between" alignItems="center">
          <Box flex justifyContent="space-between" alignItems="center" gap="20px">
            <Link href="/">
              <ArrowBack />
            </Link>
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
            <Droppable
              droppableId={data.board.id}
              type={DroppableType.BOARD}
              direction="horizontal"
            >
              {(provided, _) => (
                <Box flex fullWidth {...provided.droppableProps} ref={provided.innerRef}>
                  {data.board.lists.map((list) => (
                    <DraggableDroppableList board={data.board} key={list.id} list={list} />
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
          destroyOnClose
        >
          <Box flex flexDirection="column" gap="15px">
            <EditableText
              label="Name"
              text={data.board.name}
              onConfirm={renameBoard}
              error={
                renameMutationData?.renameBoard.exists && "Board with this name already exists"
              }
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
    </BoardContext.Provider>
  )
}

export default Board
