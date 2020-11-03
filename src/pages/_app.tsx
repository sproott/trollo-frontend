import "../../styles/globals.less"
import "../../styles/antd-custom.less"
import React from "react"
import { AppProps } from "next/app"
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

export default MyApp
