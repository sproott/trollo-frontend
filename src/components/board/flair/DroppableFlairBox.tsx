import { DraggedFlair, FLAIR } from "./flair.types"
import React, { useContext, useEffect, useState } from "react"

import { DragDropContext } from "./EditFlairs"
import { DraggableFlair } from "./DraggableFlair"
import { FlairBox } from "../board.styled"
import { FlairInfoFragment } from "../../../../generated/graphql"
import { generate } from "@ant-design/colors"
import { useDrop } from "react-dnd"

export const DroppableFlairBox = ({
  flairs,
  droppableId,
}: {
  flairs: FlairInfoFragment[]
  droppableId: string
}) => {
  const { handleDrop } = useContext(DragDropContext)
  const [{ isOver, item }, dropRef] = useDrop({
    accept: FLAIR,
    drop: async (item: DraggedFlair) => {
      await handleDrop(item, droppableId)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      item: monitor.getItem() as DraggedFlair,
    }),
  })
  const generateColors = () => {
    return generate(`hsl(${item.flair.hue}, 100%, 50%)`)
  }
  const [colors, setColors] = useState(item ? generateColors() : undefined)
  useEffect(() => {
    item && setColors(generateColors())
  }, [item])

  return (
    <FlairBox
      ref={dropRef}
      style={{
        minHeight: "80px",
        border: `2px dashed ${
          isOver && item.droppableId !== droppableId ? colors[2] : "transparent"
        }`,
        transition: "0.2s ease-in-out",
        padding: "5px",
      }}
    >
      {flairs
        .sort((f1, f2) => f1.name.localeCompare(f2.name))
        .map((f: FlairInfoFragment & { temporary?: boolean }) => (
          <DraggableFlair
            flair={f}
            key={f.id + (f.temporary && "_temp")}
            droppableId={droppableId}
            temporary={f.temporary}
          />
        ))}
    </FlairBox>
  )
}
