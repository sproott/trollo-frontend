import { isBrowser } from "./util"

const redirect = (url: string, ctx?: any) => {
  const res = ctx?.ctx?.res
  if (!isBrowser() && !!res) {
    res.writeHead(303, { Location: url })
    res.end()
  }
}

export default redirect
