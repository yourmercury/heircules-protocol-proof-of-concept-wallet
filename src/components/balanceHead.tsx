'use client';

export default function BalaceHead({balance, price, address, symb}:{balance?: string | number, address?: string, price?: string, symb?: string}){
    return (
        <div className="w-[700px] border-[0.5px] rounded-xl p-3 mx-auto mt-10 flex flex-col items-center bg-gray-900">
            <p>{address || null}</p>
            <h2 className="text-[48px] text-center">{Number(balance).toFixed(4)} <br /> {symb}</h2>
            <p></p>
            {/* <p>{price}</p> */}
        </div>
    )
}