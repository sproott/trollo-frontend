import { H1 } from "./Text"
import React from "react"
import { Button } from "antd"
import Box from "./Box"
import Link from "next/link"
import { useCurrentUserQuery } from "../../../generated/graphql"
import { Header } from "./page.styled"
import Logo from "./Logo"

type NavbarProps = {
  showLoginButton?: boolean
  hideUserInfo?: boolean
}

const UserInfo = ({ showLoginButton }: NavbarProps) => {
  const { data } = useCurrentUserQuery()
  const userName = data?.currentUser?.username
  return userName ? (
    <H1 textAlign="right" color="white">
      {userName}
    </H1>
  ) : (
    showLoginButton && (
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    )
  )
}

const Navbar = ({ showLoginButton = false, hideUserInfo = false }: NavbarProps) => {
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
        {!hideUserInfo && <UserInfo showLoginButton={showLoginButton} />}
      </Box>
    </Header>
  )
}

export default Navbar
