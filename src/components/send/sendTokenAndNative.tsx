import { useContext, useState } from "react";
import { Button } from "../Button";
import { WalletContext } from "@/context/wallet.context";

interface SendInterface {
  to: string;
  value: string;
  memo: string;
  setTx: (key: "to" | "value" | "memo", value: string) => void;
  action: (setLoading: any) => void;
  balance: string;
  symb?: string;
}

export default function SendTokenAndNative({
  to,
  value,
  memo,
  balance,
  symb,
  setTx,
  action,
}: SendInterface) {
  const { wallet } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col p-3">
      <input
        type="text"
        value={to}
        onChange={(e) => {
          if (!e.target.value.startsWith("0x")) {
            setTx("to", "0x" + e.target.value);
          } else setTx("to", e.target.value);
        }}
        className="bg-transparent border-[0.5px] rounded-lg p-2"
        placeholder="Enter address"
      />
      <div className="flex flex-col bg-gray-900 my-3 rounded-lg overflow-hidden">
        <div
          className="cursor-pointer hover:bg-gray-800 p-2"
          onClick={() => {
            setTx("to", wallet?.client.account?.address as string);
          }}
        >
          {wallet?.client.account?.address.substring(0, 10)}...
          {wallet?.client.account?.address.substring(
            wallet?.client.account?.address.length - 10
          )}
        </div>
      </div>

      <div className="text-[14px]">
        Balance: {balance} {symb || "SEP-ETH"}
      </div>
      <div className="mt-1">
        <input
          type="number"
          placeholder="Enter amount"
          className="bg-transparent border-[0.5px] rounded-lg p-2 mr-2"
          value={value}
          onChange={(e) => {
            if (Number.isNaN(Number(e.target.value))) return;
            setTx("value", e.target.value);
          }}
        />
        <span
          className="cursor-pointer"
          onClick={() => {
            setTx("value", balance);
          }}
        >
          Max
        </span>
      </div>

      <div className="mt-3">
        Memo
        <textarea
          placeholder="Enter Memo"
          value={memo}
          onChange={(e) => {
            setTx("memo", e.target.value);
          }}
          className="bg-transparent border-[0.5px] rounded-lg p-2 w-full resize-none mt-1"
        />
      </div>

      <Button
        loading={loading}
        inactive={
          !Boolean(
            wallet &&
              to.length == 42 &&
              value &&
              Number(value) <= Number(balance)
          )
        }
        className="mt-5"
        onClick={() => {
          action(setLoading);
        }}
      >
        Send
      </Button>
    </div>
  );
}
