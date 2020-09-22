import { H1 } from "./Text"
import React from "react"
import { Button } from "antd"
import Box from "./Box"
import Link from "next/link"
import { useCurrentUserQuery } from "../../../generated/graphql"
import { Header } from "./page.styled"
import Logo from "./Logo"

type NavbarProps = {
  showLogin?: boolean
}

const Navbar = ({ showLogin = false }: NavbarProps) => {
  const { data, loading } = useCurrentUserQuery()
  const userName = data?.currentUser?.username

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
        {showLogin && !loading && !userName ? (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <H1 textAlign="right" color="white">
            {userName}
          </H1>
        )}
      </Box>
    </Header>
  )
}

export default Navbar
