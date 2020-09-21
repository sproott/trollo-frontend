import React, { useEffect } from "react"
import LoginForm from "../components/login/LoginForm"
import { Layout } from "antd"
import { H1 } from "../components/common/Text"
import { LoginContent } from "../components/common/login.styled"
import Navbar from "../components/common/Navbar"
import { GetServerSideProps } from "next"
import { PageCurrentUserComp, ssrCurrentUser } from "../../generated/page"
import { useRecoilState } from "recoil"
import { userState } from "../state/user.state"
import { withApollo } from "../lib/withApollo"

const Login: PageCurrentUserComp = (props) => {
  const { data } = props
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => setUser(data?.currentUser), [data])

  return (
    <Layout style={{ minHeight: "100%" }}>
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

// Login.getInitialProps = async (ctx) => {
//   return { cookie: cookies(ctx) }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await ssrCurrentUser.getServerPage({}, context)
}

export default withApollo(ssrCurrentUser.withPage(() => ({}))(Login))
