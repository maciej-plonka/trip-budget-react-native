import {useThemeContext} from "../../../contexts/ThemeContext";
import FormButton from "./FormButton";
import React from "react";

type Props = {
    onClick: () => void
}

export const FormBuyButton = ({onClick}: Props) => {
    const theme = useThemeContext();
    return <FormButton icon={"cart"}
                       text={"Buy"}
                       color={theme.colors.secondary}
                       onClick={onClick}
    />
}
