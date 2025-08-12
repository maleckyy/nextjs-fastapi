import Head from 'next/head'
import React from 'react'

export default function HeadMeta() {
  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="description" content="Best PWA App in the world" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Head>
  )
}
