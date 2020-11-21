import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Card } from "../../../generated/graphql"
import { CardInner } from "./board.styled"

const DraggableCard = ({
  card,
}: {
  card: { __typename?: "Card" } & Pick<Card, "name" | "id" | "index">
}) => {
  return (
    <Draggable draggableId={card.id} index={card.index}>
      {(provided, snapshot) => (
        <CardInner
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          {card.name}
        </CardInner>
      )}
    </Draggable>
  )
}

export default DraggableCard
