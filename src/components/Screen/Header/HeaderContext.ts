import {createContext, useContext} from "react";
import {Color} from "../../../models/Colors";

type HeaderCtxType = {
    isActive(tab: string):boolean
    color: Color,
    selectTab: (tab: string) => void
}

const HeaderContext = createContext<HeaderCtxType | null>(null)

export const HeaderProvider = HeaderContext.Provider

export const useHeader = (): HeaderCtxType => {
    const ctx = useContext(HeaderContext)
    if(!ctx){
        throw new Error("useHeaderCtx should be used under Header component")
    }
    return ctx;
}
