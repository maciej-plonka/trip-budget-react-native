import React, {createContext, useContext} from "react";
import {Color} from "../../models/Colors";
import {gradients} from "./Gradients";

type Buttons = {
    primary: Color,
    secondary: Color,
    error: Color
}

type Headers = {
    trip: Color
    budget: Color,
    wish: Color
}

type Theme = {
    background: Color,
    headers: Headers
    buttons: Buttons,
    primary: Color,
    secondary: Color,
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
        error: gradients.red
    },
    primary: gradients.green,
    secondary: gradients.purpleReversed,
}

export type ButtonColor = keyof Buttons
export type HeaderColor = keyof Headers
const ThemeContext = createContext(theme)
export const useBackgroundColor = () => useContext(ThemeContext).background
export const useButtonColor = (color: ButtonColor) => useContext(ThemeContext).buttons[color]
export const useHeaderColor = (color: HeaderColor) => useContext(ThemeContext).headers[color]
export const usePrimaryColor = () =>  useContext(ThemeContext).primary;
export const useSecondaryColor = () => useContext(ThemeContext).secondary;
interface Props {
    children?: React.ReactNode
}
export const ThemedApplication = ({children}: Props) => (
    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>
);
