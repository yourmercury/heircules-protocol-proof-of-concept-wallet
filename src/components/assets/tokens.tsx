import { Erc20Value } from "moralis/common-evm-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface TokenCompInteface {
  name: string;
  symbol: string;
  balance: number | string;
  fiatBalance?: number;
  index: number;
  thumbnail?: string;
}

export default function Tokens({ tokens }: { tokens?: Erc20Value[] | null }) {
  const router = useRouter();

  return (
    <div className="h-[300px] overflow-y-scroll border-b">
      {tokens?.map((token, index) => (
        <div
          key={index}
          onClick={() => {
            router.push(`/token/${token.token?.contractAddress}`);
          }}
        >
          <Token
            name={token.token?.name as string}
            index={index}
            balance={token.value}
            symbol={token.token?.symbol as string}
          />
        </div>
      ))}
    </div>
  );
}

function Token({
  name,
  symbol,
  balance,
  fiatBalance,
  index,
}: TokenCompInteface) {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-900 cursor-pointer">
      <div className="flex items-center">
        <img
          src="/assets/empty-token.webp"
          className="w-[30px] h-[30px] object-cover rounded-full mr-2"
          alt=""
        />
        <span>{name}</span>
      </div>

      <div>
        <span>{balance}</span>
      </div>
    </div>
  );
}
