import { CenteredContent, Layout } from "../components/common/page.styled"

import { H1 } from "../components/common/util/Text"
import LoginForm from "../components/login/LoginForm"
import Navbar from "../components/common/Navbar"
import React from "react"
import { redirectIfLoggedIn } from "../lib/processDataFn"
import withCurrentUser from "../lib/withCurrentUser"

const Login = () => {
  return (
    <Layout>
      <Navbar />
      <CenteredContent>
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Login to the app
        </H1>
        <LoginForm />
      </CenteredContent>
    </Layout>
  )
}

export default withCurrentUser(Login, redirectIfLoggedIn)
