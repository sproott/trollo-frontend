import { getApolloClient } from "./apolloClient"
import { ApolloProvider } from "@apollo/client"
import { NextPage } from "next"

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(null, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  )
}
