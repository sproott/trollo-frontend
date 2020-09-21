import "../../styles/globals.css"
import React from "react"
import { useApollo } from "../lib/apolloClient"
import App, { AppContext, AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import "antd/dist/antd.compact.css"
import { RecoilRoot } from "recoil"

interface MyAppProps extends AppProps {
  cookie?: string
  pageProps: any
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//
//   return { ...appProps }
// }

export default MyApp
