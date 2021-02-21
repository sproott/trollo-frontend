import React, { useEffect } from "react"
import { useCurrentUserQuery, useJoinUsingInviteMutation } from "../../generated/graphql"

import Homepage from "../components/homepage/Homepage"
import { Layout } from "../components/common/page.styled"
import { Modal } from "antd"
import Navbar from "../components/common/Navbar"
import Teams from "../components/teams/Teams"
import { useRouter } from "next/router"
import withCurrentUser from "../lib/withCurrentUser"

const Home = () => {
  const { data } = useCurrentUserQuery()
  const router = useRouter()
  const inviteToken = router.query["invite-token"]
  const [joinUsingInvite] = useJoinUsingInviteMutation()

  const redirect = () => router.replace("/")

  useEffect(() => {
    if (inviteToken) {
      if (data.currentUser) {
        joinUsingInvite({
          variables: { token: inviteToken as string },
          update: (store, { data }) => {
            if (data.joinUsingInvite.alreadyInTeam) {
              Modal.info({ title: "You are already in this team", onOk: redirect })
            } else {
              Modal.info({
                title: `Successfully joined team ${data.joinUsingInvite.team.name}`,
                onOk: redirect,
              })
            }
          },
        }).catch(() => {
          Modal.error({
            title: `Invite expired or corrupted`,
            onOk: redirect,
          })
        })
      } else {
        Modal.info({
          title: "You need to be logged in to join a team",
          onOk: redirect,
        })
      }
    }
  }, [inviteToken])

  return (
    <Layout>
      <Navbar />
      {data.currentUser ? <Teams /> : <Homepage />}
    </Layout>
  )
}

export default withCurrentUser(Home)
