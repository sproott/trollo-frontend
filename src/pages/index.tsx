import React from "react"
import Navbar from "../components/common/Navbar"
import { H1 } from "../components/common/Text"
import { CenteredContent, Layout } from "../components/common/page.styled"
import { useCurrentUserQuery } from "../../generated/graphql"
import Boards from "../components/boards/Boards"
import withCurrentUser from "../lib/withCurrentUser"

const Home = () => {
  const { data } = useCurrentUserQuery()

  return (
    <Layout>
      <Navbar />
      {data?.currentUser ? (
        <Boards />
      ) : (
        <CenteredContent>
          <H1 textAlign="center" style={{ marginBottom: "50px" }}>
            Home page
          </H1>
        </CenteredContent>
      )}
    </Layout>
  )
}

export default withCurrentUser(Home)
