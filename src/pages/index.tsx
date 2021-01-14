import Homepage from "../components/homepage/Homepage"
import { Layout } from "../components/common/page.styled"
import Navbar from "../components/common/Navbar"
import React from "react"
import Teams from "../components/teams/Teams"
import { useCurrentUserQuery } from "../../generated/graphql"
import withCurrentUser from "../lib/withCurrentUser"

const Home = () => {
  const { data } = useCurrentUserQuery()

  return (
    <Layout>
      <Navbar />
      {data?.currentUser ? <Teams /> : <Homepage />}
    </Layout>
  )
}

export default withCurrentUser(Home)
