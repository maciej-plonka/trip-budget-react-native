import React from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Screen} from "../../Screen";
import {useThemeContext} from "../../../contexts/ThemeContext";

export const BudgetHomeScreen =({}: BudgetNavigationProps<"HomeScreen">) => {
    const theme = useThemeContext()
    return (
        <Screen title={"Trip budget"}
                headerColor={theme.colors.headers.budget}
                fab={{onPress: () => {}}}>
        </Screen>
    )
}
