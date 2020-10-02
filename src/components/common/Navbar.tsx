import React from "react"
import { Button, Space } from "antd"
import Box from "./Box"
import Link from "next/link"
import { useCurrentUserQuery } from "../../../generated/graphql"
import { Header } from "./page.styled"
import Logo from "./Logo"
import Avatar from "./Avatar"

const UserInfo = () => {
  const { data, loading } = useCurrentUserQuery()

  return (
    !loading &&
    (data?.currentUser?.username ? (
      <Avatar />
    ) : (
      <Space size="large">
        <Link href="/login">
          <Button ghost>Login</Button>
        </Link>
        <Link href="/register">
          <Button ghost>Register</Button>
        </Link>
      </Space>
    ))
  )
}

const Navbar = () => {
  return (
    <Header>
      <Box
        style={{ maxHeight: "100%" }}
        flex
        fullWidth
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo />
        <UserInfo />
      </Box>
    </Header>
  )
}

export default Navbar
