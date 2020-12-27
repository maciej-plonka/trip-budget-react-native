import React from "react";
import FormButton from "./FormButton";
import {useThemeContext} from "../../../contexts/ThemeContext";
type Props = {
    onClick: () => void
}

const FormAddButton = ({onClick}: Props) => {
    const theme = useThemeContext();
    return (
        <FormButton icon={"add"} color={theme.colors.primary} onClick={onClick} />
    )
}

export default FormAddButton;
