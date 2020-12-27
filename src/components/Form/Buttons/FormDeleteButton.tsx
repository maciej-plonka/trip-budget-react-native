import React from "react";
import FormButton from "./FormButton";
import {useThemeContext} from "../../../contexts/ThemeContext";

type Props = {
    onClick: () => void
}



export default function FormDeleteButton({onClick}: Props) {
    const theme = useThemeContext()
    return (
        <FormButton icon={"delete"} color={theme.colors.remove}  onClick={onClick}/>
    )
}

