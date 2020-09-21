import { blue } from "@ant-design/colors"
import { H1 } from "./Text"
import React from "react"
import { Layout } from "antd"
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
      <Box flex justifyContent="space-between">
        <H1 textAlign="center" color="white">
          Trollo
        </H1>
        {showLogin && !userName ? (
          <Link href="/login">
            <a>Login</a>
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
