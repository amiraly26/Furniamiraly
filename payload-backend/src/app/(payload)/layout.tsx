import config from '@payload-config'
import { handleServerFunctions, metadata, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap'
import './admin-theme.css'

type Args = {
  children: React.ReactNode
}

async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'

  return handleServerFunctions(args)
}

const Layout = ({ children }: Args) =>
  RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  })

export { metadata }
export default Layout
