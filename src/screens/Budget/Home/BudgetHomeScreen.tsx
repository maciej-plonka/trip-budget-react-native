import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {useThemeContext} from "../../../contexts/ThemeContext";
import {Screen} from "../../../components/Screen";

export const BudgetHomeScreen =({}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    const color = useThemeContext().colors.headers.budget
    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={color}/>
            <Screen.Content>

            </Screen.Content>
            <Screen.Fab onClick={() => {}}/>
        </Screen>
    )
}
