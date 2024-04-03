import { Abi, encodeFunctionData, toHex } from "viem";
import { hexType } from "./types";

export function make32bits(_bytes: hexType) {
    let bytes: string = _bytes.substring(2);
    let remainder = 32 - (bytes.length)/2;
    let result:hexType = '0x'
    for (let i = 0; i < remainder; i++) {
        result += '00';
    }
    return (result + bytes) as hexType;
}

export const encodeCallData = (fid: string, abi: Abi, ...args: any[]) => {
    const encoding = encodeFunctionData({
        abi,
        functionName: fid,
        args: args.length ? args : undefined,
    });

    return encoding;
}

export const batchCalldata = (list: { fid: string, args: any[], value: number, gas: number }[], abi: Abi, contract: hexType) => {
    let calldata = ''
    let calldataLengths = '';
    let callvalues = '';
    let callgases = '';
    let calldataSize = 0;
    list.forEach((item, index) => {
        let b = encodeCallData(item.fid, abi, ...item.args).substring(2);
        calldataLengths = toHex((b.length/2), {size: 1}).substring(2) + calldataLengths;
        console.log(b.length/2)
        callvalues = callvalues + toHex(item.value, {size: 32}).substring(2);
        callgases = toHex(item.gas, {size: 4}).substring(2) + callgases;
        
        calldata+=b;
        calldataSize+=(b.length/2);
    });
    let calldataSize_ = toHex(calldataSize, {size: 1}).substring(2);
    let con = contract.substring(2);
    let header = '0x04cfc5c9' + make32bits(`0x${calldataLengths+calldataSize_+con}`).substring(2);
    return header + calldata + callvalues + make32bits(`0x${callgases}`).substring(2);
}