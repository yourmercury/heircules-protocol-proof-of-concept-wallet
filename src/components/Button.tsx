'use client';

import clsx from "clsx";
import { HTMLProps } from "react";
import { twMerge } from "tw-merge";

interface ButtonProps extends HTMLProps<HTMLDivElement> {
  dyc?: any;
  inactive?: boolean;
  loading?: boolean;
}

export function cn(...x: any[]) {
  return twMerge(clsx(...x));
}

export function Button({
  children,
  className,
  dyc,
  inactive,
  loading,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <div
      {...props}
      className={cn(
        "border cursor-pointer flex justify-center items-center bg-gray-200 hover:bg-gray-50 text-black rounded p-1",
        {
          "bg-gray-700 hover:bg-gray-500 text-gray-400 cursor-not-allowed":
            inactive || loading,
        },
        className,
        dyc
      )}

      onClick={(e)=>{
        if(loading) return;
        onClick&&onClick(e)
      }}
    >
      {loading? "Processing":children} {loading && <SpinningWheel className="ml-2 w-[20px]" inStyle={'bg-gray-700'} />}
    </div>
  );
}

interface SpinningWheelProps extends HTMLProps<HTMLDivElement> {
  dyc?: any;
  inStyle?: any;
}

export function SpinningWheel({ dyc, className, inStyle }: SpinningWheelProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-b from-gray-700 to-white flex items-center justify-center relative p-1 rounded-full animate-spin",
        className,
        dyc
      )}
    >
      <div className={cn("w-full h-full bg-black rounded-full", inStyle)}></div>
    </div>
  );
}
