import React from "react"
import Select, { SelectItem } from "../common/form/Select"
import { useForm } from "react-hook-form"
import {
  BoardDocument,
  BoardQuery,
  useAssignUserMutation,
  useUnassignUserMutation,
} from "../../../generated/graphql"
import Box from "../common/Box"
import { Div } from "../common/Text"
import produce from "immer"

type FormData = {
  assignee: SelectItem
}

function AssigneeSelect({
  boardId,
  cardId,
  assignee,
  participants,
}: {
  boardId: string
  cardId: string
  assignee: BoardQuery["board"]["lists"][0]["cards"][0]["assignee"]
  participants: BoardQuery["board"]["team"]["participants"]
}) {
  const [assignUser] = useAssignUserMutation()
  const [unassignUser] = useUnassignUserMutation()

  const onChange = (userId: string) => {
    if (userId != null) {
      assignUser({
        variables: { cardId: cardId, userId },
        update: (store, { data: mutationData }) => {
          if (mutationData.assignUser) {
            const board = store.readQuery<BoardQuery>({
              query: BoardDocument,
              variables: { id: boardId },
            })
            const username = participants.map((p) => p.user).find((u) => u.id === userId).username
            store.writeQuery<BoardQuery>({
              query: BoardDocument,
              variables: { id: boardId },
              data: produce(board, (x) => {
                x.board.lists.flatMap((l) => l.cards).find((c) => c.id === cardId).assignee = {
                  id: userId,
                  username,
                }
              }),
            })
          }
        },
      })
    } else {
      unassignUser({
        variables: { cardId: cardId },
        update: (store, { data: mutationData }) => {
          if (mutationData.unassignUser) {
            const board = store.readQuery<BoardQuery>({
              query: BoardDocument,
              variables: { id: boardId },
            })
            store.writeQuery<BoardQuery>({
              query: BoardDocument,
              variables: { id: boardId },
              data: produce(board, (x) => {
                x.board.lists.flatMap((l) => l.cards).find((c) => c.id === cardId).assignee = null
              }),
            })
          }
        },
      })
    }
  }

  return (
    <Box flex fullWidth alignItems="center" gap="7px">
      <Div>Assignee: </Div>
      <Select
        defaultValue={assignee?.id}
        selectItems={[
          { value: null, label: "" },
          ...participants
            .map((p) => p.user)
            .sort((u1, u2) => u1.username.localeCompare(u2.username))
            .map((u) => {
              return { value: u.id, label: u.username }
            }),
        ]}
        onChange={onChange}
        style={{ flexGrow: 1 }}
      />
    </Box>
  )
}

export default AssigneeSelect
