import "../../styles/globals.css"
import React from "react"
import { AppProps } from "next/app"
import "antd/dist/antd.compact.css"
import { RecoilRoot } from "recoil"
import { Helmet } from "react-helmet"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <title>Trollo</title>
      </Helmet>

      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//
//   return { ...appProps }
// }

export default MyApp
