import React from "react"
import { Avatar as AntdAvatar, Popover } from "antd"
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useCurrentUserQuery,
  useLogoutMutation,
} from "../../../generated/graphql"
import { H3 } from "./Text"

const abbreviateUsername = (username: string): string => {
  return username
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
}

const Avatar = () => {
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

  return (
    <Popover
      placement="bottom"
      content={
        <div>
          <H3 color="grey" style={{ cursor: "default", marginBottom: "10px" }}>
            {data.currentUser?.username}
          </H3>
          <H3 style={{ textAlign: "center", width: "100%", cursor: "pointer" }} onClick={onLogout}>
            Logout
          </H3>
        </div>
      }
    >
      <AntdAvatar size={40} style={{ cursor: "pointer", color: "black", backgroundColor: "white" }}>
        {abbreviateUsername(data.currentUser?.username)}
      </AntdAvatar>
    </Popover>
  )
}

export default Avatar