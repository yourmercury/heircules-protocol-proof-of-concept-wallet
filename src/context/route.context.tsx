'use client';
import { createContext, useState } from "react";

export const routes = {
    ASSETS: 0,
    SEND: 1,
    RECOVERY: 2,
}

interface RouterContextI {
    route: number,
    route2: number,
    goto: (r1: number, r2?:number) => void;
}

export const RouterContext = createContext<RouterContextI>({} as any);

export default function RouterContextProvider({children}: {children: any}) {
    const [route, setRoute] = useState(0);
    const [route2, setRoute2] = useState(0);

    function goto(r1: number, r2?: number) {
        setRoute(r1);
        r2 !== undefined && setRoute2(r2);
    }

    return <RouterContext.Provider value={{route, route2, goto}}>
        {children}
    </RouterContext.Provider>
}