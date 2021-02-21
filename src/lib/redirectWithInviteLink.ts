import { NextRouter } from "next/router"

const redirectWithInviteLink = (router: NextRouter, token: string) => {
  console.log(token)

  router.replace({ pathname: "login", query: { "invite-link": token } })
}

export default redirectWithInviteLink
