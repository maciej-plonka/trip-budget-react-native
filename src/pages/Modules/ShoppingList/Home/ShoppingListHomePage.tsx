import React from "react";
import Page from "../../../Page";
import {useThemeContext} from "../../../../contexts/ThemeContext";
import {ShoppingListNavigationProps} from "../ShoppingListParamList";


export const ShoppingListHomePage = ({}:ShoppingListNavigationProps<"HomePage">) => {
    const theme = useThemeContext()
    return (
        <Page title={"Shopping list"}
              fab={{
                  position: "right",
                  onPress: () => {
                  }
              }}
              headerColor={theme.colors.headers.shoppingList}>

        </Page>
    )
}
