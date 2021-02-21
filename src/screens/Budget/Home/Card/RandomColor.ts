import {usePrimaryColor, useSecondaryColor} from "../../../../contexts/ThemeContext";

export const useRandomColor = () => {
    const primary = usePrimaryColor();
    const secondary = useSecondaryColor()
    return () => [primary, secondary].sort(() => Math.random() * 2 - 1) [0]
}
