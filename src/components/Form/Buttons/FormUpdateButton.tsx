import FormButton from "./FormButton";
import {useThemeContext} from "../../../contexts/ThemeContext";
import React from "react";

type Props = {
    onClick: () => void
}
const FormCreateButton = ({onClick}:Props) => {
    const theme = useThemeContext();

     return <FormButton icon={"confirm"}
                        text={"Update"}
                        color={theme.colors.primary}
                        onClick={onClick}
     />
}

export default FormCreateButton;
