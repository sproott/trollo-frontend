import React from "react"
import LoginForm from "../components/login/LoginForm"
import { H1 } from "../components/common/Text"
import Navbar from "../components/common/Navbar"
import withCurrentUserFn from "../lib/withCurrentUserFn"
import { CenteredContent, Layout } from "../components/common/page.styled"
import { redirectIfLoggedIn } from "../lib/processDataFn"

const Login = () => {
  return (
    <Layout>
      <Navbar hideUserInfo />
      <CenteredContent>
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Login to the app
        </H1>
        <LoginForm />
      </CenteredContent>
    </Layout>
  )
}

export default withCurrentUserFn(Login, redirectIfLoggedIn)
