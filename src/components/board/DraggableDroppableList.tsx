import { Card, List, Maybe } from "../../../generated/graphql"
import { Draggable, Droppable } from "react-beautiful-dnd"
import DraggableCard from "./DraggableCard"
import React from "react"
import { Card as AntdCard, Col } from "antd"
import NewCardButton from "./NewCardButton"
import { CardInner, ListShadow } from "./board.styled"
import { DroppableType } from "../../constants/DroppableType"

const DraggableDroppableList = ({
  boardId,
  list,
}: {
  boardId: string
  list: { __typename?: "List" } & Pick<List, "id" | "name" | "index"> & {
      cards?: Maybe<Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "index">>>
    }
}) => (
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
          title={<div {...provided.dragHandleProps}>{list.name}</div>}
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
)

export default DraggableDroppableList
