import React from "react";
import {BudgetNavigationProps} from "../BudgetParamList";
import Page from "../../../Page";
import {useThemeContext} from "../../../../contexts/ThemeContext";

export const BudgetHomePage =({}: BudgetNavigationProps<"HomePage">) => {
    const theme = useThemeContext()
    return (
        <Page title={"Trip budget"}
            headerColor={theme.colors.headers.budget}
            fab={{position:"right" , onPress: () => {}}}>
        </Page>
    )
}
