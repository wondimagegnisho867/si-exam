import React from 'react'
import Document, { Html, Main, NextScript, Head } from 'next/document'
import MyHead from '@components/head'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <MyHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
export {Head}