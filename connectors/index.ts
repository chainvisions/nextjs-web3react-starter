import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './NetworkConnector'

export const SupportedNetworks = {
    Ethereum: 1
}

const NETWORK_URLS = {
    [SupportedNetworks.Ethereum]: 'https://mainnet.eth.aragon.network/'
}

export const network = new NetworkConnector({
    urls: NETWORK_URLS,
    defaultChainId: 1
})

let networkLibrary: Web3Provider | undefined
export const getNetworkLibrary = (): Web3Provider => {
    return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const NetworkContextName = 'NETWORK'

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        1   // Ethereum Mainnet
    ]
})

export const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider, "any")
    library.pollingInterval = 12000
    return library
}