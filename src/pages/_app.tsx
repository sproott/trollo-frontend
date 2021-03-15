import "../../styles/globals.less"
import "../../styles/antd-custom.less"

import { AppProps } from "next/app"
import { Helmet } from "react-helmet"
import React from "react"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <title>Trollo</title>
      </Helmet>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
