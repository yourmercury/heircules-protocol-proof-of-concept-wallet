import { useContext, useState } from "react";
import { Button } from "../Button";
import { WalletContext } from "@/context/wallet.context";

interface SendNFTInterface {
  to: string;
  id: string;
  setTx: (key: "to", value: string) => void;
  action: (setLoading: any, isNFT?: boolean) => void;
}

export default function SendNFT({ to, setTx, action }: SendNFTInterface) {
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

      <Button
        loading={loading}
        inactive={!Boolean(wallet && to.length == 42)}
        className="mt-5"
        onClick={() => {
          action(setLoading, true);
        }}
      >
        Send
      </Button>
    </div>
  );
}
