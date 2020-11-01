import { ProcessDataFn } from "./withCurrentUser"
import { NextRouter } from "next/router"
import { CurrentUserQuery } from "../../generated/graphql"

export const redirectIfLoggedIn: ProcessDataFn = (data, router) => loginRedirect(data, router, true)
export const redirectIfLoggedOut: ProcessDataFn = (data, router) =>
  loginRedirect(data, router, false)

const loginRedirect = (
  data: CurrentUserQuery,
  router: NextRouter,
  loginStateForRedirect: boolean
) => {
  if (!!data.currentUser == loginStateForRedirect) {
    router.push("/")
    return { redirecting: true }
  }
  return { redirecting: false }
}
