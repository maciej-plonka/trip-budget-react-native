import React, {createContext, useContext} from "react";
import {Color} from "../../models";
import {gradients} from "./Gradients";
import {Parent} from "../../components";

type Buttons = {
    primary: Color,
    secondary: Color,
    error: Color,
    disabled: Color,
    transparent: Color
}

type Headers = {
    trip: Color
    budget: Color,
    wish: Color
}

type Modules = {
    wish: Color,
    budget: Color
}

type Theme = {
    background: Color,
    headers: Headers
    buttons: Buttons,
    modules: Modules,
    primary: Color,
    secondary: Color,
    error: Color
}


const theme: Theme = {
    background: "#EEF1F5",
    headers: {
        trip: "white",
        budget: gradients.orange,
        wish: gradients.purple,
    },
    buttons: {
        primary: gradients.green,
        secondary: gradients.purpleReversed,
        error: gradients.red,
        disabled: "#ababab",
        transparent: "rgba(0,0,0,0)"
    },
    modules: {
        budget: gradients.orange,
        wish: gradients.purple
    },
    primary: gradients.green,
    secondary: gradients.purpleReversed,
    error: gradients.red
}

export type ButtonColor = keyof Buttons
export type HeaderColor = keyof Headers
export type ModulesColor = keyof Modules
const ThemeContext = createContext(theme)
export const useBackgroundColor = () => useContext(ThemeContext).background
export const useButtonColor = (color: ButtonColor) => useContext(ThemeContext).buttons[color]
export const useHeaderColor = (color: HeaderColor) => useContext(ThemeContext).headers[color]
export const useModuleColor = (color: ModulesColor) => useContext(ThemeContext).modules[color]
export const usePrimaryColor = () =>  useContext(ThemeContext).primary;
export const useSecondaryColor = () => useContext(ThemeContext).secondary;
export const useErrorColor = () => useContext(ThemeContext).error
export const ThemedApplication = ({children}: Parent) => (
    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>
);
