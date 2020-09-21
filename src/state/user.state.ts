import { atom, selector } from "recoil"
import { User } from "../../generated/graphql"

export const userState = atom<User>({
  key: "userState",
  default: null,
})

export const userNameState = selector({
  key: "userNameState",
  get: ({ get }) => {
    return get(userState)?.username
  },
})
