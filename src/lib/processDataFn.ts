import { ProcessDataFn } from "./withCurrentUser"

export const redirectIfLoggedIn: ProcessDataFn = (data, router) => {
  if (!!data.currentUser) {
    router.push("/")
    return { redirecting: true }
  }
  return { redirecting: false }
}
