import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Card } from "../../../generated/graphql"
import { LineClamp } from "../common/Text"
import { CardInner } from "./board.styled"
import { Tooltip } from "antd"
import { BoardButton } from "../teams/teams.styled"

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
          isDragging={snapshot.isDragging}
        >
          <LineClamp>{card.name}</LineClamp>
        </CardInner>
      )}
    </Draggable>
  )
}

export default DraggableCard
