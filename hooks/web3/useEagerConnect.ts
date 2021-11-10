import { useState, useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { injectedConnector } from '../../connectors'
import { isMobile } from 'react-device-detect'

export function useEagerConnect() {
    const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false)
    
    useEffect(() => {
      if (!active) {
        injectedConnector.isAuthorized().then((isAuthorized) => {
          if (isAuthorized) {
            activate(injectedConnector, undefined, true).catch(() => {
              setTried(true)
            })
          } else {
            if(typeof window !== 'undefined') {
              // @ts-ignore
              if (isMobile && window.ethereum) {
                activate(injectedConnector, undefined, true).catch(() => {
                  setTried(true)
                })
              } else {
                setTried(true)
              }
            }
          }
        })
      }
    }, [activate, active]) // intentionally only running on mount (make sure it's only mounted once :))
  
    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
      if (active) {
        setTried(true)
      }
    }, [active])
  
    return tried
}

export default useEagerConnect