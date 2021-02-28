import {InputWrapper} from "../InputWrapper";
import React from "react";
import {CategorySelect} from "./CategorySelect";
import {CategorySelectProps} from "./CategorySelectProps";
import {ErrorMessage} from "../../ErrorMessage";

type Props = CategorySelectProps & {
    label: string,
    iconDisabled?: boolean,
    error?: string
}


export const FormCategorySelect = ({error, iconDisabled,...props}: Props) => {
    const icon = iconDisabled ? undefined : "category"
    return (
        <InputWrapper {...props} icon={icon}>
            <CategorySelect {...props} />
            {error && <ErrorMessage>{error}</ErrorMessage> }
        </InputWrapper>
    )
}
