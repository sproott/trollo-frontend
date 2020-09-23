import { ProcessDataFn } from "./withCurrentUserFn"

export const redirectIfLoggedIn: ProcessDataFn = (data, router) => {
  if (!!data.currentUser) {
    router.push("/")
    return { redirecting: true }
  }
  return { redirecting: false }
}
