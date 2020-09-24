import React from "react"
import { H1 } from "../components/common/Text"
import Navbar from "../components/common/Navbar"
import withCurrentUserFn from "../lib/withCurrentUserFn"
import { CenteredContent, Layout } from "../components/common/page.styled"
import { redirectIfLoggedIn } from "../lib/processDataFn"
import RegisterForm from "../components/register/RegisterForm"

const Login = () => {
  return (
    <Layout>
      <Navbar />
      <CenteredContent>
        <H1 textAlign="center" style={{ marginBottom: "30px" }}>
          Create a new account
        </H1>
        <RegisterForm />
      </CenteredContent>
    </Layout>
  )
}

export default withCurrentUserFn(Login, redirectIfLoggedIn)
