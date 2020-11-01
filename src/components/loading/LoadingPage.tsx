import React from "react"
import { Layout } from "../common/page.styled"
import Navbar from "../common/Navbar"
import Spinner from "./Spinner"

const LoadingPage = () => {
  return (
    <Layout style={{ display: "flex", flexDirection: "column" }}>
      <Navbar hideUserInfo />
      <Spinner />
    </Layout>
  )
}

export default LoadingPage
