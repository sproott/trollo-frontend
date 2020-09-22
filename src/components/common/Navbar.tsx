import { blue } from "@ant-design/colors"
import { H1 } from "./Text"
import React from "react"
import { Button, Layout } from "antd"
import Box from "./Box"
import { userNameState } from "../../state/user.state"
import { useRecoilValue } from "recoil"
import Link from "next/link"

const { Header } = Layout

type NavbarProps = {
  showLogin?: boolean
}

const Navbar = ({ showLogin = false }: NavbarProps) => {
  const userName = useRecoilValue(userNameState)

  return (
    <Header style={{ backgroundColor: blue.primary }}>
      <Box
        style={{ maxHeight: "100%" }}
        flex
        fullWidth
        justifyContent="space-between"
        alignItems="center"
      >
        <H1 color="white">Trollo</H1>
        {showLogin && !userName ? (
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
