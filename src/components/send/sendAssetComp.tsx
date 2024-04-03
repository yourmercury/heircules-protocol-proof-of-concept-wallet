'use client';

import { hexType } from "@/engine/types";
import BalaceHead from "../balanceHead";
import SendComp from "./sendComp";
import { Erc20Value } from "moralis/common-evm-utils";
import { useContext } from "react";
import { WalletContext } from "@/context/wallet.context";

interface SendAssetCompProps {
  token: Erc20Value
}

export default function SendAssetComp({ token }: SendAssetCompProps) {
  const {wallet} = useContext(WalletContext);

  return (
    <div>
      <BalaceHead address={wallet?.address} balance={token.value} symb={token.token?.symbol} />

      <div className="my-10"></div>
      {/* @ts-ignore */}
      <SendComp contract={token.token?.contractAddress as hexType} balance={token.value} symb={token.token?.symbol} />
    </div>
  );
}
