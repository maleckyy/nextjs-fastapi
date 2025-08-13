import { appDescription, appName } from '@/env/STATIC_NAMES'
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
      <meta name="application-name" content={appName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={appName} />
      <meta name="description" content={appDescription} />
      <meta name="mobile-web-app-capable" content="yes" />
    </Head>
  )
}
