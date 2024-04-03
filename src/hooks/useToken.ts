import { NFTType, hexType } from "@/engine/types";
import { Erc20Value } from "moralis/common-evm-utils";
import { useEffect, useState } from "react";

export const useToken = (contract?: hexType, address?: hexType) => {
    const [token, setToken] = useState<Erc20Value[] | null>();

    useEffect(() => {
        if(!(contract && address)) return;
        fetch(`/api/get-token-info`, { body: JSON.stringify({ addresses: [contract], address }), method: 'POST'})
            .then(async (res) => {
                if (res.status === 200) {
                    const token_ = await res.json();
                    setToken(token_);
                } else setToken(null);
            })
    }, [contract, address]);

    return { token }
}