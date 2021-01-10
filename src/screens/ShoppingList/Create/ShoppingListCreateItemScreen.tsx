import {ShoppingListNavigationProps} from "../../../navigation";
import {Screen} from "../../Screen";
import {useThemeContext} from "../../../contexts/ThemeContext";
import React, {useEffect} from "react";
import {Center} from "../../../components/Center";
import {
    FormButtonRow,
    FormCard,
    FormCategoryPicker,
    FormCreateButton,
    FormImagePicker,
    FormMoneyInput,
    FormTextInput
} from "../../../components/Form";
import {useNewShoppingListItem} from "./NewShoppingListItemHook";
import {ScrollView, View} from "react-native";
import {showToast} from "../../../models/Toast";

export const ShoppingListCreateItemScreen = ({route, navigation}: ShoppingListNavigationProps<"CreateItemScreen">) => {
    const theme = useThemeContext();
    const item = useNewShoppingListItem(route.params.tripId)
    useEffect(() => {
        !item && navigation.goBack()
    }, [item])
    if (!item) return (<View/>)

    const handleCreateItem = () => {
        item.create()
        showToast("Item created")
        navigation.goBack()
    }
    return (
        <Screen title={"Create item"} headerColor={theme.colors.headers.shoppingList}>
            <ScrollView>
                <Center styles={{padding: 16}}>
                    <FormCard avatar={<FormImagePicker value={item.imageId} onChanged={item.setImageId}/>}>
                        <FormCategoryPicker label={"Category"} value={item.category} onChanged={item.setCategory}
                                            values={item.categories}/>
                        <FormMoneyInput label={"Value"} value={item.targetValue} onChanged={item.setTargetValue}/>
                        <FormTextInput label={"Name"} value={item.name} onChanged={item.setName} icon={"name"}/>
                        <FormButtonRow right>
                            <FormCreateButton onClick={handleCreateItem}/>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </ScrollView>
        </Screen>
    )
}
