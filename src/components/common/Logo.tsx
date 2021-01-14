import Link from "next/link"
import { LogoStyled } from "./Logo.styled"
import React from "react"

const Logo = () => {
  return (
    <Link href="/">
      <LogoStyled>Trollo</LogoStyled>
    </Link>
  )
}

export default Logo
