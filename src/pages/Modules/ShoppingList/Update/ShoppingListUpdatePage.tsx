import {useDispatch, useSelector} from "react-redux";
import {selectShoppingItemById} from "../../../../store/selectors";
import {ShoppingListNavigationProps} from "../ShoppingListParamList";
import Page from "../../../Page";
import React, {useEffect, useState} from "react";
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
import {BudgetCategory, ShoppingListItem} from "../../../../store/states";
import {useBudgetCategoriesByTripId} from "../../../../hooks/Budget";
import {Money} from "../../../../models/Money";
import {confirmMessageBox} from "../../../../models/MessageBox";
import {deleteShoppingListItemById, updateShoppingListItem} from "../../../../store/actions/ShoppingListActions";
import {showToast} from "../../../../models/Toast";
import {ScrollView} from "react-native";

export const ShoppingListUpdatePage = ({navigation, route}: ShoppingListNavigationProps<"UpdateItemPage">) => {
    const theme = useThemeContext()
    const {itemId, tripId} = route.params
    const item = useSelector(selectShoppingItemById(itemId))
    const categories = useBudgetCategoriesByTripId(tripId)
    const currentCategory = categories.find(it => it.id === item?.budgetCategoryId);
    const [imageId, setImageId] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<BudgetCategory | undefined>(currentCategory);
    const [targetValue, setTargetValue] = useState<Money>(item?.targetValue ?? {amount: 0, currency: "¥"})
    const [name, setName] = useState<string>(item?.name ?? "")
    const [comments, setComments] = useState<string>(item?.comments ?? "")
    useEffect(() => {
        !item && navigation.goBack()
    }, [item])
    const dispatch = useDispatch()

    const handleDelete = async () => {
        const messageBoxOptions = {title: "Caution!", description: "Do you want to delete item?"};
        const shouldDelete = await confirmMessageBox(messageBoxOptions)
        if (!shouldDelete) {
            return;
        }
        dispatch(deleteShoppingListItemById(itemId));
        showToast("Item deleted")
    }
    const handleUpdate = () => {
        if (!item) return;
        const toUpdate: ShoppingListItem = {
            ...item,
            budgetCategoryId: category?.id,
            name,
            imageId,
            targetValue,
            comments
        }
        dispatch(updateShoppingListItem(toUpdate));
        showToast("Item updated")
        navigation.goBack()
    }

    useEffect(() => {
        console.log(`[UpdatePage] imageId changed: ${imageId}`)
    },[imageId])
    const handleBuy = () => {

    }
    return (
        <Page title={"Update shopping item"} headerColor={theme.colors.headers.shoppingList}>
            <ScrollView >
                <Center styles={{padding: 16}}>
                    <FormCard avatar={<FormImagePicker value={imageId} onChanged={setImageId}/>} >
                        <FormCategoryPicker label={"Category"} value={category} onChanged={setCategory}
                                            values={categories}/>
                        <FormMoneyInput label={"Value"} value={targetValue} onChanged={setTargetValue}/>
                        <FormTextInput label={"Name"} value={name} onChanged={setName} icon={"name"}/>
                        <FormTextArea label={"Comments"} value={comments} onChanged={setComments} icon={"name"}/>
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
