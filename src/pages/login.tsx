import React, { useEffect } from "react"
import LoginForm from "../components/login/LoginForm"
import { H1 } from "../components/common/Text"
import { LoginContent } from "../components/login/login.styled"
import Navbar from "../components/common/Navbar"
import withCurrentUser, { ProcessDataFn } from "../lib/withCurrentUser"
import { Layout } from "../components/common/page.styled"

const Login = () => {
  return (
    <Layout>
      <Navbar />
      <LoginContent>
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Login to the app
        </H1>
        <LoginForm />
      </LoginContent>
    </Layout>
  )
}

const redirectIfLoggedIn: ProcessDataFn = (data, router) => {
  if (!!data.currentUser) {
    router.push("/")
    return { redirecting: true }
  }
  return { redirecting: false }
}

export default withCurrentUser(Login, redirectIfLoggedIn)
