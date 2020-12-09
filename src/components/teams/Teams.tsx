import React, { useEffect } from "react"
import { H0, H1 } from "../common/Text"
import { Content } from "../common/page.styled"
import { Col, Divider, Row, Skeleton } from "antd"
import TeamsInfo from "./TeamsInfo"
import Box from "../common/Box"
import NewTeamButton from "./NewTeamButton"
import {
  ParticipantTeamFragment,
  TeamDeletedDocument,
  TeamDeletedSubscription,
  TeamRenamedDocument,
  TeamRenamedSubscription,
  useTeamsQuery,
} from "../../../generated/graphql"
import produce from "immer"

const getIfContainsTeam = (
  participants: ParticipantTeamFragment[],
  teamId: string
): ParticipantTeamFragment[] | undefined => {
  return !!participants.flatMap((p) => p.team).find((t) => t.id === teamId)
    ? participants
    : undefined
}

const Teams = () => {
  const { data, loading, subscribeToMore } = useTeamsQuery()

  useEffect(() => {
    subscribeToMore<TeamRenamedSubscription>({
      document: TeamRenamedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          const participant = x.currentUser.owns
            .concat(x.currentUser.participatesIn)
            .find((p) => p.team.id === data.teamRenamed.id)
          participant.team = { ...participant.team, ...data.teamRenamed }
        })
      },
    })
    subscribeToMore<TeamDeletedSubscription>({
      document: TeamDeletedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          const participants =
            getIfContainsTeam(x.currentUser.owns, data.teamDeleted) ??
            getIfContainsTeam(x.currentUser.participatesIn, data.teamDeleted)
          participants!.splice(
            participants.findIndex((p) => p.team.id === data.teamDeleted),
            1
          )
        })
      },
    })
  }, [])

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
