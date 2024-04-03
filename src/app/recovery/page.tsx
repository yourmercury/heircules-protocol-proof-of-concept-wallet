"use client";

import { Button } from "@/components/Button";
import { WalletContext } from "@/context/wallet.context";
import SmartWallet from "@/engine/smartWallet";
import {
  proxyAbi,
  registryAbi,
  smartWalletRegistry,
} from "@/engine/smartWalletRegistry";
import { RecoveryInfoI, hexType } from "@/engine/types";
import { useContext, useState } from "react";
import { zeroAddress } from "viem";

interface SocialRecI {}

export default function Recovery() {
  const { client, pubClient } = useContext(WalletContext);
  const [ll, setll] = useState(false);
  const [kl, setkl] = useState(false);
  const [sl, setsl] = useState(false);
  const [account, setAccount] = useState("");
  const [socialRec, setSocialRec] = useState({ secret: "", newOwner: "" });
  const [recovery, setRecovery] = useState<RecoveryInfoI | null>();

  function getKinWindow() {
    if (recovery?.initialized) {
      let isPassed =
        Number(recovery.pingedAt) + Number(recovery.window) < Date.now() / 1000;
      let canRecoverAt = new Date(
        (Number(recovery.pingedAt) + Number(recovery.window)) * 1000
      ).toString();

      return { isPassed, canRecoverAt };
    }

    return { isPassed: false, canRecoverAt: new Date().toString() };
  }

  if (!client) return null;
  if(!pubClient) return null;

  const kw = getKinWindow();

  return (
    <div className="p-20">
      <div className="border rounded-lg p-10 max-w-[400px] mx-auto">
        <div className="flex flex-col">
          <label htmlFor="">Address</label>
          <input
            type="text"
            value={account}
            onChange={(e)=>{
                setAccount(e.target.value);
            }}
            name=""
            id=""
            placeholder="Enter Address"
            className="rounded-lg border bg-transparent p-2"
          />
          <Button
            loading={ll}
            className="px-2 mt-2"
            onClick={async () => {
              try {
                setll(true);
                let address = await pubClient?.readContract({
                  abi: registryAbi,
                  functionName: "getOperator",
                  args: [account],
                  account: client.account,
                  address: smartWalletRegistry,
                });

                if (address && zeroAddress !== address) {
                  let rec = await pubClient?.readContract({
                    abi: proxyAbi,
                    functionName: "getRecoveryInfo",
                    account: client?.account,
                    // @ts-ignore
                    address: account as hexType,
                  });

                  setRecovery(rec as RecoveryInfoI);
                } else {
                  setRecovery(null);
                }
              } catch (error) {
                console.log(error);
              }finally {
                setll(false);
              }
            }}
          >
            Load wallet Recovery
          </Button>
        </div>

        {recovery && recovery.initialized && (
          <>
            <div className="mt-10 py-2 border-t border-dashed">
              <h2 className="text-gray-500 mb-3">Kin Recovery</h2>
              {!kw.isPassed && <span>Kin window isn't active</span>}
              {kw.isPassed && (
                <Button
                  loading={kl}
                  className="px-2"
                  onClick={async () => {
                    setkl(true);
                    SmartWallet
                      .kinRecovery(client, pubClient, account as hexType)
                      .finally(() => setkl(false))
                      .catch((error) => console.log(error));
                  }}
                >
                  Try Kin Recovery
                </Button>
              )}
            </div>

            <div className="mt-10 py-2 border-t border-dashed">
              <h2 className="text-gray-500 mb-3">Social Recovery</h2>
              <input
                type="text"
                name=""
                value={socialRec.secret}
                onChange={(e) => {
                  setSocialRec({ ...socialRec, secret: e.target.value });
                }}
                id=""
                placeholder="Enter Secret"
                className="rounded-lg border bg-transparent p-2 w-full"
              />
              <input
                type="text"
                name=""
                value={socialRec.newOwner}
                onChange={(e) => {
                  setSocialRec({ ...socialRec, newOwner: e.target.value });
                }}
                id=""
                placeholder="Enter new owner"
                className="rounded-lg border bg-transparent p-2 w-full mt-2"
              />
              <Button
                loading={sl}
                onClick={() => {
                  setsl(true);
                  SmartWallet
                    .socialRecovery(client, pubClient, account as hexType, socialRec.secret, socialRec.newOwner as hexType)
                    .finally(() => setsl(false))
                    .catch((error) => console.log(error));
                }}
                className="px-2 mt-2"
              >
                Recover Wallet
              </Button>
            </div>
          </>
        )}

        {recovery && !recovery.initialized && (
          <div>This Wallet does not have a recovery</div>
        )}
        {recovery === null && (
          <div>This wallet does not exist in the Heircules protocol</div>
        )}
      </div>
    </div>
  );
}
