import React, { FC, useState } from "react"
import * as Types from "../../generated/graphql"
import { NextRouter, useRouter } from "next/router"
import { isBrowser } from "./util"
import { useCurrentUserQuery } from "../../generated/graphql"
import { withApollo } from "./withApollo"
import LoadingPage from "../components/LoadingPage"

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
  const [calledProcessFn, setCalledProcessFn] = useState(false)
  const router = useRouter()

  if (!!processDataFn && isBrowser() && !calledProcessFn && !loading && !!data) {
    const { redirecting } = processDataFn(data, router)
    !!redirecting && setRedirecting(true)
    setCalledProcessFn(true)
  }

  return !!data && !redirecting ? <Comp /> : <LoadingPage />
}

const withCurrentUserFn = (Comp: FC, processDataFn: ProcessDataFn) => {
  return withApollo(withCurrentUserFnInner(Comp, processDataFn))
}

export default withCurrentUserFn
