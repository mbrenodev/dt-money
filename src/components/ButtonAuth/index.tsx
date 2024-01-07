'use client'
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from '@thirdweb-dev/react'

export function ButtonAuth() {
  return (
    <>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="YOUR_CLIENT_ID"
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          localWallet(),
          embeddedWallet({
            auth: {
              options: ['email', 'google', 'apple', 'facebook'],
            },
          }),
        ]}
      >
        <ConnectWallet
          theme={'dark'}
          modalTitle={'DT Money'}
          modalSize={'compact'}
          welcomeScreen={{ title: '' }}
          modalTitleIconUrl={''}
        />
      </ThirdwebProvider>
    </>
  )
}
