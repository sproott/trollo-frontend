import { HomepageHeader, HomepageLink, TryItArrow } from "./homepage.styled"

import Box from "../common/util/Box"
import { Col } from "antd"
import { Content } from "../common/page.styled"
import { H2 } from "../common/util/Text"
import Link from "next/link"
import React from "react"
import theme from "../../style/theme"

function Homepage() {
  return (
    <Content style={{ backgroundColor: theme.blue.primary, gap: "50px" }}>
      <Box flex justifyContent="center" alignItems="center" style={{ flexGrow: 1 }}>
        <Col xs={20} sm={16} md={14} lg={10} xl={8}>
          <Box flex flexDirection="column" gap="50px">
            <Box flex justifyContent="flex-start">
              <HomepageHeader>simple</HomepageHeader>
            </Box>
            <Box flex justifyContent="flex-end">
              <HomepageHeader>friendly</HomepageHeader>
            </Box>
            <Box flex justifyContent="flex-start">
              <HomepageHeader>productive</HomepageHeader>
            </Box>
            <Box flex justifyContent="flex-end">
              <Link href="/register">
                <Box flex alignItems="center">
                  <HomepageLink>try it</HomepageLink> <TryItArrow />
                </Box>
              </Link>
            </Box>
          </Box>
        </Col>
      </Box>
      <Box fullWidth justifyContent="center">
        <H2 color="white" textAlign="center">
          David Hrabě 4. F, 2020/2021
        </H2>
      </Box>
    </Content>
  )
}

export default Homepage
