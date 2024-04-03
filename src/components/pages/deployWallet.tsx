"use client";
import { useContext, useState } from "react";
import { Button } from "../Button";
import { WalletContext } from "@/context/wallet.context";
import { registryAbi, smartWalletRegistry } from "@/engine/smartWalletRegistry";
import { Account } from "viem";
import { hexType } from "@/engine/types";

export default function DeployWallet() {
  const [loading, setLoading] = useState(false);
  const {client, pubClient} = useContext(WalletContext);

  return (
    <div className="">
      <div className="w-[500px] mx-auto mt-20 flex flex-col items-center justify-center">
        <div className="text-center">
          You have not a <span>Smart account</span>. Click on the button below
          to deploy
        </div>
        <Button loading={loading} onClick={async()=>{
            try {
                setLoading(true);
                const hash = await client?.writeContract({
                    abi: registryAbi,
                    functionName: 'deployWallet',
                    account: client.account as Account,
                    address: smartWalletRegistry,
                    chain: client.chain
                })

                const tx = await pubClient?.waitForTransactionReceipt({hash: hash as hexType});
                
                if(tx?.status == 'success') location.reload();
                else throw 'error';

            }catch(error){
                console.log(error);
            }finally {
                setLoading(false);
            }
        }} className="w-fit px-2">Deploy</Button>
      </div>
    </div>
  );
}
