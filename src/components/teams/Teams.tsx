import React, { useEffect } from "react"
import { H0 } from "../common/Text"
import { Content } from "../common/page.styled"
import { Col, Divider, Row } from "antd"
import TeamsInfo from "./TeamsInfo"
import Box from "../common/Box"
import NewTeamButton from "./NewTeamButton"
import {
  ParticipantTeamFragment,
  TeamDeletedDocument,
  TeamDeletedSubscription,
  TeamRenamedDocument,
  TeamRenamedSubscription,
  TeamUserAddedDocument,
  TeamUserAddedSubscription,
  TeamUserRemovedDocument,
  TeamUserRemovedSubscription,
  useTeamsQuery,
} from "../../../generated/graphql"
import produce from "immer"

const getIfContainsTeam = (
  participants: ParticipantTeamFragment[],
  teamId: string
): ParticipantTeamFragment[] | undefined => {
  return !!participants.map((p) => p.team).find((t) => t.id === teamId) ? participants : undefined
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
    subscribeToMore<TeamUserAddedSubscription>({
      // user is added automatically for the team participants by Apollo
      document: TeamUserAddedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          if (data.teamUserAdded.user.id === x.currentUser.id) {
            x.currentUser.participatesIn.push({
              __typename: "Participant",
              team: data.teamUserAdded.team,
            })
          }
        })
      },
    })
    subscribeToMore<TeamUserRemovedSubscription>({
      document: TeamUserRemovedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          if (data.teamUserRemoved.userId === x.currentUser.id) {
            x.currentUser.participatesIn.splice(
              x.currentUser.participatesIn.findIndex(
                (p) => p.team.id === data.teamUserRemoved.teamId
              ),
              1
            )
          } else {
            const participants = x.currentUser.owns
              .map((p) => p.team)
              .find((t) => t.id === data.teamUserRemoved.teamId).participants
            participants.splice(
              participants.findIndex((p) => p.user.id === data.teamUserRemoved.userId),
              1
            )
          }
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
