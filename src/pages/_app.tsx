import "../../styles/globals.css"
import React from "react"

function MyApp({ Component, pageProps }: { Component: React.ComponentClass; pageProps: any }) {
  return <Component {...pageProps} />
}

export default MyApp
