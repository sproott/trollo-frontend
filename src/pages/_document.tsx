import Document, { DocumentContext } from "next/document"
import React, { PropsWithChildren } from "react"

import { AppInitialProps } from "next/app"
import { ServerStyleSheet } from "styled-components"
import { resetServerContext } from "react-beautiful-dnd"

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    resetServerContext()
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: PropsWithChildren<AppInitialProps>) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
