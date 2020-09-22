import React, { useEffect } from "react"
import Navbar from "../components/common/Navbar"
import { LoginContent } from "../components/common/login.styled"
import { H1 } from "../components/common/Text"
import { Layout } from "antd"
import { GetServerSideProps } from "next"
import { PageCurrentUserComp, ssrCurrentUser } from "../../generated/page"
import { withApollo } from "../lib/withApollo"
import { useRecoilState } from "recoil"
import { userState } from "../state/user.state"

const Home: PageCurrentUserComp = ({ data }) => {
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    if (!user) {
      setUser(data?.currentUser)
    }
  }, [data])

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Navbar showLogin />
      <LoginContent>
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Home page
        </H1>
      </LoginContent>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await ssrCurrentUser.getServerPage({}, context)
}

export default withApollo(ssrCurrentUser.withPage(() => ({}))(Home))
