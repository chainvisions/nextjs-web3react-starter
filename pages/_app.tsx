import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

// web3-react.
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../connectors'

// Components.
import Web3ReactManager from '../components/Web3ReactManager'
const Web3ProviderNetwork = dynamic(
  () => import('../components/Web3ProviderNetwork'),
  { ssr: false }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          {children}
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default MyApp