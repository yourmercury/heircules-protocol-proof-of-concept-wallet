'use client';

import SendAssetComp from "@/components/send/sendAssetComp";
import { WalletContext } from "@/context/wallet.context";
import { hexType } from "@/engine/types";
import { useToken } from "@/hooks/useToken";
import { useContext } from "react";

export default function Asset({params: {contract}}: {params: {contract: hexType}}){
    const {wallet} = useContext(WalletContext);
    const {token} = useToken(contract, wallet?.address);

    console.log(token);

    if(!(token && token[0])) return null;

    return <SendAssetComp token={token[0]}/>
}