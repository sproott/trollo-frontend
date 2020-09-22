import { H1 } from "./Text"
import React from "react"
import { Button, Layout } from "antd"
import Box from "./Box"
import Link from "next/link"
import { useCurrentUserQuery } from "../../../generated/graphql"
import { Header } from "./page.styled"

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
        <H1 color="white">Trollo</H1>
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
