import React, { useEffect } from "react"
import { H1 } from "../common/Text"
import { Content } from "../common/page.styled"
import { useBoardsQuery } from "../../../generated/graphql"
import { Col, Divider, Row, Skeleton } from "antd"
import { BoardGrid } from "./Boards.styled"
import TeamsInfo from "./TeamsInfo"

const SkeletonButton = () => <Skeleton.Button active style={{ width: "100px", height: "80px" }} />

const MySkeleton = () => (
  <>
    <Skeleton active paragraph={{ rows: 0 }} />
    <BoardGrid>
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
    </BoardGrid>
  </>
)

const LoadingComp = () => (
  <>
    <MySkeleton />
    <MySkeleton />
  </>
)

const Boards = () => {
  const { data, loading, startPolling, stopPolling } = useBoardsQuery()

  useEffect(() => {
    startPolling(10000)
    return stopPolling
  }, [])

  return (
    <Content style={{ padding: "50px" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={16} xl={12}>
          {data?.currentUser && !loading && (
            <>
              <H1>Your teams</H1>
              <TeamsInfo teams={data.currentUser.ownTeams} />
              <Divider />
              <H1>Teams you participate in</H1>
              <TeamsInfo teams={data.currentUser?.teams} />
            </>
          )}
        </Col>
      </Row>
    </Content>
  )
}

export default Boards
