import React from "react"
import Link from "next/link"
import { LogoStyled } from "./Logo.styled"

const Logo = () => {
  return (
    <Link href="/">
      <LogoStyled>Trollo</LogoStyled>
    </Link>
  )
}

export default Logo
