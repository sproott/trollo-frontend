import React, { useEffect } from "react"
import { H0, H1 } from "../common/Text"
import { Content } from "../common/page.styled"
import { Col, Divider, Row, Skeleton } from "antd"
import { BoardGrid } from "./teams.styled"
import TeamsInfo from "./TeamsInfo"
import Box from "../common/Box"
import NewTeamButton from "./NewTeamButton"
import { useTeamsQuery } from "../../../generated/graphql"

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

const Teams = () => {
  const { data, loading } = useTeamsQuery()

  return (
    <Content>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={16} xl={12}>
          {data?.currentUser && !loading && (
            <>
              <Box flex justifyContent="space-between">
                <H0>Your teams</H0>
                <NewTeamButton />
              </Box>
              <TeamsInfo teams={data.currentUser.owns.map((p) => p.team)} isOwn />
              <Divider />
              <H0>Teams you participate in</H0>
              <TeamsInfo teams={data.currentUser.participatesIn.map((p) => p.team)} />
            </>
          )}
        </Col>
      </Row>
    </Content>
  )
}

export default Teams
