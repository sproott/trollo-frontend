import { isBrowser } from "./util"
import { useRouter } from "next/router"

const redirect = (url: string, ctx?: any) => {
  const res = ctx?.ctx?.res
  if (!isBrowser() && !!res) {
    res.writeHead(303, { Location: url })
    res.end()
  } else {
    const router = useRouter()
    router.replace(url)
  }
}

export default redirect
