import { HTMLProps } from "react";
import { cn } from "./Button";

interface SmallNavI extends HTMLProps<HTMLDivElement> {
    goto: (r1: number, r2?:number)=>void;
    route: number 
}

export default function SmallNav({ goto, route, className, ...props }: SmallNavI) {
  return (
    <div {...props} className={cn("flex items-center gap-5 w-fit mx-auto my-5", className)}>
      <SmallNavLink onClick={()=> goto(0)} isActive={route == 0}>Wallet</SmallNavLink>
      <SmallNavLink onClick={()=> goto(1)} isActive={route == 1}>Send</SmallNavLink>
      <SmallNavLink onClick={()=> goto(2)} isActive={route == 2}>Recovery</SmallNavLink>
    </div>
  );
}

interface SmallNavLinkProps extends HTMLProps<HTMLSpanElement> {
    dyc?: any;
    isActive?: boolean;
}

function SmallNavLink({ children, onClick, dyc, className, isActive, ...props }: SmallNavLinkProps) {
  return (
    <span
        {...props}
      onClick={(e) => {
        onClick && onClick(e);
      }}
      className={cn("border rounded-lg p-2 hover:bg-gray-800 cursor-pointer", {'bg-gray-800 hover:bg-gray-800': isActive}, className, dyc)}
    >
      {children}
    </span>
  );
}