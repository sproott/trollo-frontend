import React from "react"
import Navbar from "../components/common/Navbar"
import { H1 } from "../components/common/Text"
import { CenteredContent, Layout } from "../components/common/page.styled"
import { withApollo } from "../lib/withApollo"

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <CenteredContent>
        <H1 textAlign="center" style={{ marginBottom: "50px" }}>
          Home page
        </H1>
      </CenteredContent>
    </Layout>
  )
}

export default withApollo(Home)
