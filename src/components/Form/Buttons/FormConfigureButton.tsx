import {useThemeContext} from "../../../contexts/ThemeContext";
import FormButton from "./FormButton";
import React from "react";

type Props = {
    onClick: () => void
}

const FormConfigureButton = ({onClick}: Props) => {
    const theme = useThemeContext();
    return (
        <FormButton icon={"configure"} color={theme.colors.primary} onClick={onClick} />
    )
}

export default FormConfigureButton;
