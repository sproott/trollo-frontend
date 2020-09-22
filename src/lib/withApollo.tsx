import { useApollo } from "./apolloClient"
import { ApolloProvider } from "@apollo/client"
import { NextPage } from "next"

export const withApollo = (Comp: NextPage) => (props: any) => {
  const apolloClient = useApollo(props.apolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Comp />
    </ApolloProvider>
  )
}
