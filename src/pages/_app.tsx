import "../../styles/globals.css"
import React from "react"
import App, { AppContext, AppProps } from "next/app"
import "antd/dist/antd.compact.css"
import { RecoilRoot } from "recoil"

const MyApp = ({ Component, pageProps }: AppProps) => {
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
