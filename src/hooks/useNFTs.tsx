"use client";
import { WalletContext } from "@/context/wallet.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NFTType } from "@/engine/types";
import SmartWallet from "@/engine/smartWallet";

export const useNFTs = (wallet?: SmartWallet | null) => {
  const [sNFTts, setSNFTs] = useState<NFTType[] | null>();

  //'0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c'

  useEffect(() => {
    if(!wallet) return;
    fetch(`/api/get-nfts/${wallet.address}`)
    .then(async (res)=>{
        if(res.status === 200){
            setSNFTs(await res.json());
        }else setSNFTs(null);
    })
  }, [wallet]);

  return { nfts: sNFTts };
};
