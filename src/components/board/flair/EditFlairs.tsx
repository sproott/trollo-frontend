import {
  BoardDocument,
  BoardQuery,
  useAssignFlairMutation,
  useUnassignFlairMutation,
} from "../../../../generated/graphql"
import { Button, Divider } from "antd"
import React, { createContext, useContext, useEffect, useState } from "react"
import { findNestedValue, removeNestedValue } from "../../../lib/nestedPathUtil"

import { BoardContext } from "../Board"
import Box from "../../common/util/Box"
import { Div } from "../../common/util/Text"
import { DndProvider } from "react-dnd-multi-backend"
import { DraggedFlair } from "./flair.types"
import { DroppableFlairBox } from "./DroppableFlairBox"
import { EditOutlined } from "@ant-design/icons"
import { FlairInfoFragment } from "../../../../generated/graphql"
import HTML5ToTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch"
import Modal from "antd/lib/modal/Modal"
import { NewFlairButton } from "./NewFlairButton"
import produce from "immer"

export const DragDropContext = createContext<{
  handleDrop: (item: DraggedFlair, destination: string) => void | Promise<void>
  droppingId?: string
}>(undefined)

export const EditFlairs = ({
  cardFlairs,
  teamFlairs,
  cardId,
}: {
  cardFlairs: FlairInfoFragment[]
  teamFlairs: FlairInfoFragment[]
  cardId: string
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [droppingId, setDroppingId] = useState<string>(null)
  const [cardFlairsLookup, setCardFlairsLookup] = useState<{ [key: string]: FlairInfoFragment }>({})
  const { boardId } = useContext(BoardContext)
  useEffect(() => {
    setCardFlairsLookup(
      cardFlairs.reduce(function (map: { [key: string]: FlairInfoFragment }, flair) {
        map[flair.id] = flair
        return map
      }, {})
    )
  }, [cardFlairs])
  const [assignFlair] = useAssignFlairMutation()
  const [unassignFlair] = useUnassignFlairMutation()

  const moveFlair = async (item: DraggedFlair, droppableId: string) => {
    if (item.droppableId !== droppableId) {
      setDroppingId(item.flair.id)
      if (cardFlairsLookup[item.flair.id]) {
        await unassignFlair({
          variables: { cardId, flairId: item.flair.id },
          optimisticResponse: { unassignFlair: true },
          update: (store, { data }) => {
            if (data.unassignFlair) {
              const board = store.readQuery<BoardQuery>({
                query: BoardDocument,
                variables: { id: boardId },
              })

              store.writeQuery<BoardQuery>({
                query: BoardDocument,
                variables: { boardId },
                data: produce(board, (x) => {
                  removeNestedValue(
                    x.board,
                    ["lists", "cards", "flairs"],
                    (f) => f.id === item.flair.id
                  )
                }),
              })
            }
          },
        })
      } else {
        await assignFlair({
          variables: { cardId, flairId: item.flair.id },
          optimisticResponse: { assignFlair: true },
          update: (store, { data }) => {
            if (data.assignFlair) {
              const board = store.readQuery<BoardQuery>({
                query: BoardDocument,
                variables: { id: boardId },
              })

              store.writeQuery<BoardQuery>({
                query: BoardDocument,
                variables: { boardId },
                data: produce(board, (x) => {
                  findNestedValue(x.board, ["lists", "cards"], (c) => c.id === cardId).flairs.push(
                    item.flair
                  )
                }),
              })
            }
          },
        })
      }
      setDroppingId(null)
    }
  }

  return (
    <>
      <EditOutlined
        style={{ padding: "6px", cursor: "pointer" }}
        onClick={setModalVisible.bind(this, true)}
      />
      <Modal
        visible={modalVisible}
        onCancel={setModalVisible.bind(this, false)}
        footer={
          <Button type="primary" onClick={setModalVisible.bind(this, false)}>
            Close
          </Button>
        }
      >
        <DndProvider options={HTML5ToTouch}>
          <DragDropContext.Provider value={{ handleDrop: moveFlair, droppingId }}>
            <Box flex flexDirection="column">
              <Div style={{ marginBottom: "7px" }}>Card flairs</Div>
              <DroppableFlairBox
                flairs={[...cardFlairs].sort((f1, f2) => f1.name.localeCompare(f2.name))}
                droppableId="card"
              />
              <Divider style={{ margin: 0, marginBottom: "20px" }} />
              <Box flex gap="10px" alignItems="center" style={{ marginBottom: "7px" }}>
                <Div>Available flairs</Div>
                <NewFlairButton />
              </Box>
              <DroppableFlairBox
                flairs={[...teamFlairs]
                  .sort((f1, f2) => f1.name.localeCompare(f2.name))
                  .filter((f) => !cardFlairsLookup[f.id])}
                droppableId="team"
              />
            </Box>
          </DragDropContext.Provider>
        </DndProvider>
      </Modal>
    </>
  )
}
