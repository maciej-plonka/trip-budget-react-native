import React, {createContext, useContext} from "react";
import {Gradient} from "../../models/Colors";

const gradients = {
    green: {
        colors: ["#52E07A", "#4AC9AA"],
        start: [0, 1],
        end: [1, 0]
    } as Gradient,

    purple: {
        colors: ["#7F7DF2", "#C772EF"],
        start: [0, 1],
        end: [1, 0]
    } as Gradient,
    purpleReversed: {
        colors: ["#C772EF", "#7F7DF2"],
        start: [0, 1],
        end: [1, 0]
    } as Gradient,
    orange: {
        colors: ["#EF7297", "#FCC87B"],
        start: [0, 1],
        end: [1, 0]
    } as Gradient,
    red: {
        colors:  ["#D04545", "#EF7297"],
        start: [0, 1],
        end: [1, 0]
    } as Gradient,
}

interface Theme {
    background: string,
    colors: {
        headers: {
            budget: Gradient,
            shoppingList: Gradient
        },
        fab: Gradient,
        primary: Gradient,
        secondary: Gradient,
        remove: Gradient

    }

}

const theme: Theme = {
    background: "#EEF1F5",
    colors: {
        headers: {
            budget: gradients.orange,
            shoppingList: gradients.purple,
        },
        fab: gradients.green,
        primary: gradients.green,
        secondary: gradients.purpleReversed,
        remove: gradients.red
    }
}

const ThemeContext = createContext<Theme>(theme)
export const useThemeContext = () => useContext(ThemeContext)

interface Props {
    children?: React.ReactNode
}

const Theme = ({children}: Props) => (
    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>
);

export default Theme;
