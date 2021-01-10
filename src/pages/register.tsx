import { CenteredContent, Layout } from "../components/common/page.styled"

import { H1 } from "../components/common/util/Text"
import Navbar from "../components/common/Navbar"
import React from "react"
import RegisterForm from "../components/register/RegisterForm"
import { redirectIfLoggedIn } from "../lib/processDataFn"
import withCurrentUser from "../lib/withCurrentUser"

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

export default withCurrentUser(Login, redirectIfLoggedIn)
