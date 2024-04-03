"use client";

import { useAccount, useConnect } from "wagmi";
import { Button } from "./Button";
import { metaMask } from "wagmi/connectors";
import { HTMLProps, useContext } from "react";
import { WalletContext } from "@/context/wallet.context";
import { walletTypes } from "@/engine/types";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { connect, isPending } = useConnect();
  const { isConnecting, isReconnecting, isConnected } = useAccount();
  const { wallet, client } = useContext(WalletContext);
  const router = useRouter();

  return (
    <header className="flex items-center p-5 px-10 border-b-[0.5px] border-b-gray-500 bg-gray-900">
      <h2
        className="cursor-pointer hover:font-bold"
        onClick={() => {
          location.assign("/");
        }}
      >
        Heircules Protocol
      </h2>

      <nav className="ml-auto mr-10">
        <NavLink onClick={()=>{
          router.push('/recovery');
        }}>Recover Wallet</NavLink>
      </nav>

      <div className="mr-5">
        <div>
          Operator:{" "}
          <abbr title={client?.account?.address}>
            {client?.account?.address.substring(0, 10)}...
          </abbr>
        </div>

        <div>
          Gas Tank:{" "}
          <abbr title={wallet?.getBalance().toString()}>
            {wallet?.getBalance(true).toFixed(4)} TFIL
          </abbr>
        </div>
      </div>

      <Button
        loading={isPending || isConnecting || isReconnecting}
        className=""
        onClick={() => {
          connect({ connector: metaMask() });
        }}
      >
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </Button>
    </header>
  );
}

interface NavLinkProps extends HTMLProps<HTMLSpanElement> {
  active?: boolean;
}

function NavLink({ children, active, ...props }: NavLinkProps) {
  return (
    <span {...props} className="cursor-pointer hover:text-gray-400">
      {children}
    </span>
  );
}
