import React from "react"
import Navbar from "../components/common/Navbar"
import { Layout } from "../components/common/page.styled"
import { useCurrentUserQuery } from "../../generated/graphql"
import Teams from "../components/teams/Teams"
import withCurrentUser from "../lib/withCurrentUser"
import Homepage from "../components/homepage/Homepage"

const Home = () => {
  const { data } = useCurrentUserQuery()

  return (
    <Layout>
      <Navbar />
      {!!data?.currentUser ? <Teams /> : <Homepage />}
    </Layout>
  )
}

export default withCurrentUser(Home)
