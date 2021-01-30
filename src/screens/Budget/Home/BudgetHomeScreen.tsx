import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Screen} from "../../../components";

export const BudgetHomeScreen =({}: BudgetNavigationProps<"BudgetHomeScreen">) => {
    return (
        <Screen>
            <Screen.Header title={"Trip budget"} color={"budget"}/>
            <Screen.Content>

            </Screen.Content>
            <Screen.Fab onClick={() => {}}/>
        </Screen>
    )
}
