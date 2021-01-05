import {
  BoardCreatedDocument,
  BoardCreatedSubscription,
  BoardDeletedDocument,
  BoardDeletedSubscription,
  BoardRenamedDocument,
  BoardRenamedSubscription,
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
import { Col, Divider, Row } from "antd"
import React, { useEffect } from "react"

import Box from "../common/Box"
import { Content } from "../common/page.styled"
import { H0 } from "../common/Text"
import NewTeamButton from "./NewTeamButton"
import TeamsInfo from "./TeamsInfo"
import produce from "immer"
import { removeNestedValue } from "../../lib/nestedPathUtil"

const getIfContainsTeam = (
  participants: ParticipantTeamFragment[],
  teamId: string
): ParticipantTeamFragment[] | undefined => {
  return !!participants.map((p) => p.team).find((t) => t.id === teamId) ? participants : undefined
}

const getIfContainsBoard = (
  participants: ParticipantTeamFragment[],
  boardId: string
): ParticipantTeamFragment[] | undefined => {
  return !!participants.flatMap((p) => p.team.boards).find((b) => b.id === boardId)
    ? participants
    : undefined
}

const Teams = () => {
  const { data, loading, refetch, subscribeToMore } = useTeamsQuery()

  useEffect(() => {
    refetch()
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
    subscribeToMore<BoardCreatedSubscription>({
      document: BoardCreatedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          const team = x.currentUser.owns
            .concat(x.currentUser.participatesIn)
            .map((p) => p.team)
            .find((t) => t.id === data.boardCreated.teamId)
          team.boards.push(data.boardCreated.board)
        })
      },
    })
    subscribeToMore<BoardRenamedSubscription>({
      document: BoardRenamedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          const participants = data.boardRenamed.isOwn
            ? x.currentUser.owns
            : x.currentUser.participatesIn
          const board = participants
            .flatMap((p) => p.team.boards)
            .find((b) => b.id === data.boardRenamed.id)
          Object.assign(board, data.boardRenamed)
        })
      },
    })
    subscribeToMore<BoardDeletedSubscription>({
      document: BoardDeletedDocument,
      updateQuery: (prev, { subscriptionData: { data } }) => {
        return produce(prev, (x) => {
          const participants =
            getIfContainsBoard(x.currentUser.owns, data.boardDeleted) ??
            getIfContainsBoard(x.currentUser.participatesIn, data.boardDeleted)
          removeNestedValue(participants, ["team", "boards"], (b) => b.id === data.boardDeleted)
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
              <Box flex justifyContent="space-between" alignItems="center">
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
