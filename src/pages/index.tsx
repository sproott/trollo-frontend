import React from "react"
import Navbar from "../components/common/Navbar"
import { LoginContent } from "../components/login/login.styled"
import { H1 } from "../components/common/Text"
import { Layout } from "../components/common/page.styled"
import { withApollo } from "../lib/withApollo"

const Home = () => {
  return (
    <Layout>
      <Navbar showLoginButton />
      <LoginContent>
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Home page
        </H1>
      </LoginContent>
    </Layout>
  )
}

export default withApollo(Home)
