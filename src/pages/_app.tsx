import "../../styles/globals.less"
import "../../styles/antd-custom.less"

import { AppProps } from "next/app"
import { Helmet } from "react-helmet"
import React from "react"
import { RecoilRoot } from "recoil"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <title>Trollo</title>
      </Helmet>

      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp
