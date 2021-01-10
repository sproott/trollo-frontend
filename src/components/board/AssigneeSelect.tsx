import {
  ParticipantUserFragment,
  UserInfoFragment,
  useAssignUserMutation,
  useUnassignUserMutation,
} from "../../../generated/graphql"

import Box from "../common/util/Box"
import { Div } from "../common/util/Text"
import React from "react"
import Select from "../common/form/Select"

function AssigneeSelect({
  cardId,
  assignee,
  participants,
}: {
  cardId: string
  assignee: UserInfoFragment
  participants: ParticipantUserFragment[]
}) {
  const [assignUser] = useAssignUserMutation()
  const [unassignUser] = useUnassignUserMutation()

  const onChange = async (userId: string) => {
    if (userId != null) {
      await assignUser({
        variables: { cardId: cardId, userId },
      })
    } else {
      await unassignUser({
        variables: { cardId: cardId },
      })
    }
  }

  return (
    <Box flex fullWidth alignItems="center" gap="7px">
      <Div>Assignee: </Div>
      <Select
        value={assignee?.id}
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
