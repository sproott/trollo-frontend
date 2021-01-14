import { DraggedFlair, FLAIR } from "./flair.types"
import { FlairFromFragment, FlairFromFragmentProps } from "./FlairFromFragment"
import React, { useContext } from "react"

import { DragDropContext } from "./EditFlairs"
import { useDrag } from "react-dnd"

export const DraggableFlair = ({
  style,
  flair,
  droppableId,
  temporary,
  ...other
}: FlairFromFragmentProps & {
  droppableId: string
  temporary: boolean
}) => {
  const { droppingId } = useContext(DragDropContext)
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: FLAIR, flair, droppableId } as DraggedFlair,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  return !droppingId || droppingId !== flair.id ? (
    <FlairFromFragment
      ref={temporary ? undefined : dragRef}
      flair={flair}
      style={{
        ...style,
        opacity: temporary || isDragging ? 0.5 : 1,
        margin: 0,
      }}
      {...other}
    />
  ) : (
    <></>
  )
}
