import { Card, List, Maybe } from "../../../generated/graphql"
import { Droppable } from "react-beautiful-dnd"
import DraggableCard from "./DraggableCard"
import React from "react"
import { Card as AntdCard, Col } from "antd"

const DroppableList = ({
  list,
}: {
  list: { __typename?: "List" } & Pick<List, "id" | "name"> & {
      cards?: Maybe<Array<{ __typename?: "Card" } & Pick<Card, "id" | "name" | "index">>>
    }
}) => (
  <Col xs={12} sm={10} md={8} lg={6} xl={4}>
    <AntdCard title={list.name} style={{ margin: "0 4px" }}>
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
    </AntdCard>
  </Col>
)

export default DroppableList
