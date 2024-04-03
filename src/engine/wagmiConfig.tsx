'use client';

import { createConfig, http } from '@wagmi/core'
import { sepolia, mainnet, filecoinCalibration } from '@wagmi/core/chains'
import { metaMask, injected } from '@wagmi/connectors'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Chain, createPublicClient } from 'viem';

const queryClient = new QueryClient();

export const getPubClient = (chain: Chain)=>{
  return createPublicClient({
    chain: chain,
    transport: http()
});
}

export const wagmiConfig = createConfig({
  chains: [filecoinCalibration, sepolia],
  connectors: [metaMask()],
  transports: {
    [filecoinCalibration.id]: http(),
    [sepolia.id]: http(),
  },
})

export function WagmiProvider_({children}: any){
    return (
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
    )
}