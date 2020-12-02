import React from "react"
import { Space } from "antd"
import Box from "./Box"
import Link from "next/link"
import { useCurrentUserQuery } from "../../../generated/graphql"
import { Header } from "./page.styled"
import Logo from "./Logo"
import CurrentUserAvatar from "./CurrentUserAvatar"
import { Button } from "./Navbar.styled"

type NavbarProps = {
  hideUserInfo?: boolean
}

const UserInfo = () => {
  const { data, loading } = useCurrentUserQuery()

  return (
    !loading &&
    (data?.currentUser?.username ? (
      <CurrentUserAvatar />
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
