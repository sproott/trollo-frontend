import { H1 } from "./Text"
import React from "react"
import { Button, Space } from "antd"
import Box from "./Box"
import Link from "next/link"
import { useCurrentUserQuery } from "../../../generated/graphql"
import { Header } from "./page.styled"
import Logo from "./Logo"

type NavbarProps = {
  hideUserInfo?: boolean
}

const UserInfo = () => {
  const { data, loading } = useCurrentUserQuery()
  const userName = data?.currentUser?.username
  return userName ? (
    <H1 textAlign="right" color="white">
      {userName}
    </H1>
  ) : (
    !loading && (
      <Space size="large">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </Space>
    )
  )
}

const Navbar = ({ hideUserInfo = false }: NavbarProps) => {
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
        {!hideUserInfo && <UserInfo />}
      </Box>
    </Header>
  )
}

export default Navbar
