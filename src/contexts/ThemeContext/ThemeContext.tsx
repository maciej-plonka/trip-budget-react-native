import React, {createContext, useContext} from "react";

type GradientPosition = [number, number]
type GradientColor = [string, string]

interface Gradient {
    colors: GradientColor
    start: GradientPosition
    end: GradientPosition
}

interface Theme {
    background: string,
    color: {
        budget: Gradient,
        shoppingList: Gradient
        primary: Gradient,
        secondary: Gradient,
        remove: Gradient
    }
}

const theme: Theme = {
    background: "#EEF1F5",
    color: {
        budget: {
            colors: ["#EF7297", "#FCC87B"],
            start: [0, 1],
            end: [1, 0]
        },
        shoppingList: {
            colors: ["#7F7DF2", "#C772EF"],
            start: [0, 1],
            end: [1, 0]
        },
        primary: {
            colors: ["#52E07A", "#4AC9AA"],
            start: [0, 1],
            end: [1, 0]
        },
        secondary: {
            colors: ["#C772EF", "#7F7DF2"],
            start: [0, 1],
            end: [1, 0]
        },
        remove: {
            colors: ["#D04545", "#EF7297"],
            start: [0, 1],
            end: [1, 0]
        }
    }
}

const ThemeContext = createContext<Theme>(theme)
export const useThemeContext = () => useContext(ThemeContext)

interface Props {
    children?: Array<JSX.Element | undefined> | JSX.Element
}

const Theme = ({children}: Props) => (
    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>
);

export default Theme;
