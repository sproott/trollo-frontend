import { Col } from "antd"
import React from "react"
import Box from "../common/Box"
import { CenteredContent } from "../common/page.styled"
import theme from "../../style/theme"
import { HomepageHeader, HomepageLink, TryItArrow } from "./homepage.styled"
import Link from "next/link"

function Homepage() {
  return (
    <CenteredContent style={{ backgroundColor: theme.blue.primary }}>
      <Box flex justifyContent="center">
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
    </CenteredContent>
  )
}

export default Homepage
