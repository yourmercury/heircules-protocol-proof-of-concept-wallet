"use client";
import SmartWallet from "@/engine/smartWallet";
import { registryAbi, smartWalletRegistry } from "@/engine/smartWalletRegistry";
import { NFTType, hexType, walletTypes } from "@/engine/types";
import { wagmiConfig } from "@/engine/wagmiConfig";
import { useNFTs } from "@/hooks/useNFTs";
import { useTokens } from "@/hooks/useTokens";
import { getPublicClient, getWalletClient } from "@wagmi/core";
import { Erc20Value } from "moralis/common-evm-utils";
import { createContext, useEffect, useState } from "react";
import { PublicClient, WalletClient } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

interface WalletContextI {
  wallet?: SmartWallet | null;
  client?: WalletClient;
  pubClient?: PublicClient;
  activeWallet: walletTypes | "";
  smartAddress?: hexType | null;
  nfts?: NFTType[] | null;
  tokens?: Erc20Value[] | null;
}

export const WalletContext = createContext<WalletContextI>({} as any);

export default function WalletContextProvider({ children }: { children: any }) {
  const [wallet, setWallet] = useState<SmartWallet | null>();
  const [smartAddress, setSmartAddress] = useState<hexType | null>();
  const [activeWallet, setActiveWallet] = useState<walletTypes | "">("");
  const { data: client } = useWalletClient();
  const pubClient = usePublicClient();
  const { address } = useAccount();
  const { nfts } = useNFTs(wallet);
  const { tokens } = useTokens(wallet);

  async function initWallet(address: hexType) {
    if (!(client && pubClient && address)) return;

    const balance = await pubClient.getBalance({
      address,
      blockTag: "latest",
    });
    const gasBalance = await pubClient.getBalance({
      address: client.account.address,
      blockTag: "latest",
    });

    const wallet_ = new SmartWallet(
      client,
      address,
      pubClient,
      balance,
      gasBalance,
      "smart"
    );

    console.log(wallet_);
    setWallet(wallet_);
  }

  useEffect(() => {
    if (!(pubClient && client)) return;
    pubClient
      .readContract({
        address: smartWalletRegistry,
        abi: registryAbi,
        functionName: "getWallets",
        args: [address],
        account: client.account,
      })
      .then((accounts) => {
        console.log(accounts);
        // @ts-ignore
        if (accounts?.[0]) {
          //@ts-ignore
          let address_ = accounts[0];
          setSmartAddress(address_ as hexType);
          initWallet(address_).catch((error) => console.log(error));
        } else {
          let address_ = null;
          setSmartAddress(null);
          setWallet(null);
        }
      })
      .catch((error) => {
        setSmartAddress(null);
        setWallet(null);
        console.log(error);
      });
  }, [pubClient, client]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        activeWallet,
        smartAddress,
        nfts,
        tokens,
        client,
        pubClient,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
