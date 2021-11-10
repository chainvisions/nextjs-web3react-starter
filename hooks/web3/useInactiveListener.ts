import { useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { injectedConnector } from '../../connectors'

const useInactiveListener = (suppress = false) => {
    const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does
    
    useEffect(() => {
        // @ts-ignore
        const { ethereum } = window
  
        if (ethereum && ethereum.on && !active && !error && !suppress) {
                const handleChainChanged = () => {
                // eat errors
                activate(injectedConnector, undefined, true).catch((error) => {
                    console.error('Failed to activate after chain changed', error)
                })
            }
    
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length > 0) {
                    // eat errors
                    activate(injectedConnector, undefined, true).catch((error) => {
                        console.error('Failed to activate after accounts changed', error)
                    })
                }
            }
    
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
    
            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                }
            }
        }
        return undefined
    }, [active, error, suppress, activate])
}

export default useInactiveListener