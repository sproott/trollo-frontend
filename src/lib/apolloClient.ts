import { useMemo } from "react"
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { isBrowser } from "./util"
import getConfig from "next/config"
import typePolicies from "./typePolicies"

const API_URL = getConfig()?.publicRuntimeConfig?.API_URL as string

export type Options = {
  cookie?: string
}

let apolloClient: ApolloClient<NormalizedCacheObject>

function createLink(cookie: string) {
  if (isBrowser()) {
    return new HttpLink({
      uri: API_URL ?? "http://localhost:4000/graphql",
      credentials: "include",
      headers: {
        cookie: cookie ?? "",
      },
    })
  }
}

function createApolloClient({ cookie }: Options) {
  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: createLink(cookie),
    cache: new InMemoryCache({ typePolicies }),
  })
}

export function initializeApollo(initialState: any = null, { cookie }: Options) {
  const _apolloClient = apolloClient ?? createApolloClient({ cookie })

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser()) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any, { cookie }: Options = {}) {
  return useMemo(() => initializeApollo(initialState, { cookie }), [initialState])
}

export const getApolloClient = (ctx: any, initialState?: NormalizedCacheObject) => {
  return initializeApollo(initialState, { cookie: ctx?.req?.headers?.cookie })
}
