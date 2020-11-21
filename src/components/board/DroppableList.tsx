import { Card, List, Maybe } from "../../../generated/graphql"
import { Droppable } from "react-beautiful-dnd"
import DraggableCard from "./DraggableCard"
import React from "react"
import { Col } from "antd"
import { ListInner } from "./board.styled"
import { H3, H4 } from "../common/Text"

const DroppableList = ({
  list,
}: {
  list: { __typename?: "List" } & Pick<List, "id" | "name"> & {
      cards?: Maybe<Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "index">>>
    }
}) => (
  <Col xs={12} sm={10} md={8} lg={6} xl={4}>
    <ListInner>
      <H4 style={{ marginBottom: "5px", userSelect: "none" }}>{list.name}</H4>
      <div>
        <Droppable droppableId={list.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                minHeight: "1px",
              }}
            >
              {list.cards.map((card) => (
                <DraggableCard key={card.id} card={card} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </ListInner>
  </Col>
)

export default DroppableList
