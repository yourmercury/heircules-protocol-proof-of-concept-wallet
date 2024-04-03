import { useContext, useState } from "react";
import { Button, SpinningWheel } from "../Button";
import { WalletContext } from "@/context/wallet.context";
import { hexType } from "@/engine/types";
import SendNFT from "./sendNFT";
import SendTokenAndNative from "./sendTokenAndNative";

interface SendCompInterface {
  contract?: hexType;
  id?: string;
  balance?: string
  symb?: string
}

interface TxObjI {
  to: string;
  value: string;
  memo: string;
}


export default function SendComp({ contract, id, balance, symb }: SendCompInterface) {
  const { wallet } = useContext(WalletContext);
  const [txObj, setTxObj] = useState<TxObjI>({
    to: "",
    value: id || "",
    memo: "",
  });

  const setTx = (key: "to" | "value" | "memo", value: string) => {
    txObj[key] = value;
    setTxObj({ ...txObj });
  };

  const action = (setLoading: any) => {
    if (!wallet) return;
    console.log("running")
    setLoading(true);
    wallet
      .transferNative(txObj.to as hexType, Number(txObj.value))
      .then((request) => {
        console.log(request)
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=> setLoading(false))
  };

  const actionToken = (setLoading: any, isNFT?: boolean) => {
    if (!wallet) return;
    setLoading(true);
    wallet
      .transferTokens(
        contract as hexType,
        txObj.to as hexType,
        Number(id || txObj.value),
        typeof id == 'string' ? true : false
      )
      .then((hash) => {
        console.log(hash);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-[330px] rounded-lg mx-auto overflow-hidden">
      {id === undefined && (
        <SendTokenAndNative
          {...txObj}
          setTx={setTx}
          action={contract ? actionToken : action}
          balance={contract? balance as string : wallet?.getBalance().toString() as string}
          symb={symb}
        />
      )}

      {id !== undefined && (
        <SendNFT to={txObj.to} id={id} setTx={setTx} action={actionToken} />
      )}
      {/* <Preview /> */}
    </div>
  );
}

