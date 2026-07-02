import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

export const generateMetadata = ({ params, searchParams }) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }) =>
  RootPage({ config, importMap, params, searchParams })

export default Page
