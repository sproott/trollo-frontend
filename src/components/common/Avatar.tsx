import React from "react"
import { Avatar as AntdAvatar } from "antd"

const abbreviateUsername = (username: string): string => {
  return username
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
}

function Avatar({
  username,
  backgroundColor,
  color,
  pointer,
}: {
  username: string
  backgroundColor?: string
  color?: string
  pointer?: boolean
}) {
  return (
    <AntdAvatar
      size={40}
      style={{
        cursor: !!pointer && "pointer",
        color: color ?? "black",
        backgroundColor: backgroundColor ?? "white",
        userSelect: "none",
      }}
    >
      {username && abbreviateUsername(username)}
    </AntdAvatar>
  )
}

export default Avatar
