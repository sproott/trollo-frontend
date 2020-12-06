import React, { useEffect } from "react"
import { Avatar as AntdAvatar, Popover } from "antd"
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useCurrentUserQuery,
  useLogoutMutation,
} from "../../../generated/graphql"
import { H3 } from "./Text"
import Avatar from "./Avatar"

const CurrentUserAvatar = () => {
  const { data } = useCurrentUserQuery()
  const [logout] = useLogoutMutation()

  const onLogout = async () => {
    try {
      await logout({
        update: (store, { data }) => {
          if (!!data.logout) {
            store.writeQuery<CurrentUserQuery>({
              query: CurrentUserDocument,
              data: {
                currentUser: null,
              },
            })
          }
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const username = data.currentUser?.username

  return (
    <Popover
      placement="bottom"
      content={
        <div>
          <H3 color="grey" style={{ cursor: "default", marginBottom: "10px" }}>
            {username}
          </H3>
          <H3 style={{ textAlign: "center", width: "100%", cursor: "pointer" }} onClick={onLogout}>
            Logout
          </H3>
        </div>
      }
    >
      <div>
        <Avatar username={username} pointer />
      </div>
    </Popover>
  )
}

export default CurrentUserAvatar
