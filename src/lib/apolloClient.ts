import { useMemo } from "react"
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from "@apollo/client"
import { isBrowser } from "./util"
import getConfig from "next/config"
import typePolicies from "./typePolicies"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

const API_URL = getConfig()?.publicRuntimeConfig?.API_URL as string

let apolloClient: ApolloClient<NormalizedCacheObject>

const createHttpLink = () =>
  new HttpLink({
    uri: !!API_URL ? "https://" + API_URL : "http://localhost:4000/graphql",
    credentials: "include",
  })

const createWsLink = () =>
  new WebSocketLink({
    uri: !!API_URL ? "wss://" + API_URL : "ws://localhost:4000/graphql",
    options: {
      reconnect: true,
    },
  })

function createLink() {
  if (isBrowser()) {
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === "OperationDefinition" && definition.operation === "subscription"
      },
      createWsLink(),
      createHttpLink()
    )
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: createLink(),
    cache: new InMemoryCache({ typePolicies }),
  })
}

export function initializeApollo(initialState: any = null) {
  let _apolloClient
  if (apolloClient) {
    // if client is present, recreate its link to force it to reconnect
    apolloClient.setLink(createLink())
    _apolloClient = apolloClient
  } else {
    _apolloClient = createApolloClient()
  }

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

export function useApollo(initialState: any) {
  return useMemo(() => initializeApollo(initialState), [initialState])
}

export const getApolloClient = (ctx: any, initialState?: NormalizedCacheObject) => {
  return initializeApollo(initialState)
}
