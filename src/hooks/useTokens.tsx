"use client";
import { useEffect, useState } from "react";
import { Erc20Value } from "moralis/common-evm-utils";
import SmartWallet from "@/engine/smartWallet";

export const useTokens = (wallet?: SmartWallet | null) => {
  const [oTokens, setOTokens] = useState<Erc20Value[] | null>();
  const [sTokens, setSTokens] = useState<Erc20Value[] | null>();

  function getTokens() {
    if (wallet?.type === "eoa") return setOTokens;
    else return setSTokens;
  }

  //"0x0F35B0753E261375C9a6Cb44316b4BdC7e765509"

  useEffect(() => {
    if(!wallet) return;
    fetch(
      `/api/get-tokens/${wallet.address}`
    ).then(async (res) => {
      if (res.status === 200) {
        let x = await res.json();
        console.log(x);
        setSTokens(x);
      } else setSTokens(null);
    });
  }, [wallet]);

  return {
        tokens: sTokens,
  };
};
