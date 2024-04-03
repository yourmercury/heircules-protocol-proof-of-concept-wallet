"use client";
import AssetContainer from "@/components/assets/assetContainer";
import BalaceHead from "@/components/balanceHead";
import SendComp from "@/components/send/sendComp";
import SmallNav from "@/components/smallNav";
import { RouterContext, routes } from "@/context/route.context";
import { WalletContext } from "@/context/wallet.context";
import { useContext, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import RecoveryComp from "../recovery/recoveryComp";
import { Button, SpinningWheel } from "../Button";
import DeployWallet from "./deployWallet";

export default function HomePage() {
  const { route, goto } = useContext(RouterContext);
  const { address, isConnected } = useAccount();
  const { wallet } = useContext(WalletContext);

  if(wallet === undefined){
    return <div className="flex justify-center py-20">
      <SpinningWheel className="w-[100px] h-[100px]"/>
    </div>
  }

  if (wallet === null) {
    return (
      <DeployWallet />
    );
  }

  return (
    <div>
      <BalaceHead
        balance={wallet.getBalance().toFixed(4)}
        symb={"SEP-ETH"}
        address={wallet.address}
        price={"$1000"}
      />
      <SmallNav goto={goto} route={route} />
      {route == routes.ASSETS && <AssetContainer />}
      {route == routes.SEND && <SendComp />}
      {route == routes.RECOVERY && <RecoveryComp />}
    </div>
  );
}
