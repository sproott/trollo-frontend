import React from "react"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/">
      <a style={{ fontSize: 36, fontFamily: "Pacifico", color: "white" }}>Trollo</a>
    </Link>
  )
}

export default Logo
