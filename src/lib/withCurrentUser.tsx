import React, { FC, useEffect, useState } from "react"
import * as Types from "../../generated/graphql"
import { useCurrentUserQuery } from "../../generated/graphql"
import { NextRouter, useRouter } from "next/router"
import { isBrowser } from "./util"
import { withApollo } from "./withApollo"
import LoadingPage from "../components/loading/LoadingPage"

export type ProcessDataFn = (
  data: Types.CurrentUserQuery,
  router: NextRouter
) => ProcessDataFnReturnType

export type ProcessDataFnReturnType = {
  redirecting?: boolean
}

const withCurrentUserFnInner = (Comp: FC, processDataFn?: ProcessDataFn) => () => {
  const { data, loading } = useCurrentUserQuery()
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!!processDataFn && isBrowser() && !loading && !!data) {
      const { redirecting } = processDataFn(data, router)
      !!redirecting && setRedirecting(true)
    }
  }, [data])

  return !!data && !redirecting ? <Comp /> : <LoadingPage />
}

const withCurrentUser = (Comp: FC, processDataFn?: ProcessDataFn) => {
  return withApollo(withCurrentUserFnInner(Comp, processDataFn))
}

export default withCurrentUser
