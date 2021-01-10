import {ShoppingListNavigationProps} from "../ShoppingListParamList";
import Page from "../../../Page";
import React, {useEffect} from "react";
import {useThemeContext} from "../../../../contexts/ThemeContext";
import {Center} from "../../../../components/Center";
import {
    FormButtonRow,
    FormBuyButton,
    FormCard,
    FormCategoryPicker,
    FormDeleteButton,
    FormImagePicker,
    FormMoneyInput,
    FormTextArea,
    FormTextInput,
    FormUpdateButton
} from "../../../../components/Form";
import {confirmMessageBox} from "../../../../models/MessageBox";
import {showToast} from "../../../../models/Toast";
import {ScrollView, View} from "react-native";
import {useUpdateShoppingListItem} from "./UpdateShoppingListItemHook";

export const ShoppingListUpdatePage = ({navigation, route}: ShoppingListNavigationProps<"UpdateItemPage">) => {
    const theme = useThemeContext()
    const item = useUpdateShoppingListItem(route.params.itemId)
    useEffect(() => {
        !item && navigation.goBack()
    }, [item])

    if (!item) return (<View/>)

    const handleDelete = async () => {
        const messageBoxOptions = {title: "Caution!", description: "Do you want to delete item?"};
        const shouldDelete = await confirmMessageBox(messageBoxOptions)
        if (!shouldDelete) {
            return;
        }
        item.delete()
        showToast("Item deleted")
    }
    const handleUpdate = () => {
        item.update()
        showToast("Item updated")
        navigation.goBack()
    }

    const handleBuy = () => {
    }

    return (
        <Page title={"Update shopping item"} headerColor={theme.colors.headers.shoppingList}>
            <ScrollView>
                <Center styles={{padding: 16}}>
                    <FormCard avatar={<FormImagePicker value={item.imageId} onChanged={item.setImageId}/>}>
                        <FormCategoryPicker label={"Category"} value={item.category} onChanged={item.setCategory}
                                            values={item.categories}/>
                        <FormMoneyInput label={"Value"} value={item.targetValue} onChanged={item.setTargetValue}/>
                        <FormTextInput label={"Name"} value={item.name} onChanged={item.setName} icon={"name"}/>
                        <FormTextArea label={"Comments"} value={item.comments} onChanged={item.setComments}
                                      icon={"name"}/>
                        <FormButtonRow center>
                            <FormDeleteButton onClick={handleDelete}/>
                            <FormBuyButton onClick={handleBuy}/>
                            <FormUpdateButton onClick={handleUpdate}/>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </ScrollView>
        </Page>
    )
}
