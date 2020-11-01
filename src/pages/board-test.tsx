import React from "react"
import { Content, Layout } from "../components/common/page.styled"
import Navbar from "../components/common/Navbar"
import withCurrentUser from "../lib/withCurrentUser"
import { Card as AntdCard } from "antd"
import { H1 } from "../components/common/Text"
import Box from "../components/common/Box"

const List = ({ name }: { name: string }) => (
  <div>
    <AntdCard title={name} style={{ width: "200px" }}>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
      <AntdCard.Grid style={{ width: "100%", cursor: "pointer", userSelect: "none" }}>
        Card content
      </AntdCard.Grid>
    </AntdCard>
  </div>
)

const BoardTestPage = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <H1>General</H1>
        <div
          style={{ flex: 1, display: "flex", overflow: "auto", height: "100%", paddingTop: "10px" }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <List name="Bugs" />
            <List name="WIP" />
            <List name="Fixed" />
            <List name="Fixed" />
            <List name="Fixed" />
            <List name="Fixed" />
            <List name="Fixed" />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default withCurrentUser(BoardTestPage)
