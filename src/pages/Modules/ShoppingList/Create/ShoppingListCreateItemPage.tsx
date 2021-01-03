import {ShoppingListNavigationProps} from "../ShoppingListParamList";
import Page from "../../../Page";
import {useThemeContext} from "../../../../contexts/ThemeContext";
import React, {useEffect, useState} from "react";
import {Center} from "../../../../components/Center";
import {
    FormButtonRow,
    FormCard,
    FormCategoryPicker,
    FormCreateButton, FormImagePicker,
    FormMoneyInput,
    FormTextInput
} from "../../../../components/Form";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId} from "../../../../store/selectors";
import {BudgetCategory} from "../../../../store/states";
import {Money} from "../../../../models/Money";
import {createShoppingListItemWithUniqueId} from "../../../../store/actions";

export const ShoppingListCreateItemPage = ({route, navigation}: ShoppingListNavigationProps<"CreateItemPage">) => {
    const theme = useThemeContext();
    const tripId = route.params.tripId;
    const dispatch = useDispatch()

    const budget = useSelector(selectBudgetByTripId(tripId));
    const categories = budget ? useSelector(selectBudgetCategoriesByBudgetId(budget.id)) : []
    const [imageId, setImageId] = useState<string | undefined>(undefined)
    const [category, setCategory] = useState<BudgetCategory | undefined>(undefined)
    const [targetValue, setTargetValue] = useState<Money>({amount: 0, currency: budget?.totalBudget?.currency ?? "¥"})
    const [name, setName] = useState<string>("");


    useEffect(() => {
        console.log(`new Image id: ${imageId}`)
    }, [imageId])

    const handleCreateItem = () => {
        const newItem = {
            tripId,
            budgetCategoryId: category?.id,
            targetValue,
            name
        }
        dispatch(createShoppingListItemWithUniqueId(newItem))
        navigation.goBack()
    }
    return (
        <Page title={"Create item"} headerColor={theme.colors.headers.shoppingList}>
            <Center styles={{padding: 16}}>
                <FormCard avatar={<FormImagePicker value={imageId} onChanged={setImageId}/>}>
                    <FormCategoryPicker label={"Category"} value={category} onChanged={setCategory}
                                        values={categories}/>
                    <FormMoneyInput label={"Value"} value={targetValue} onChanged={setTargetValue}/>
                    <FormTextInput label={"Name"} value={name} onChanged={setName} icon={"name"}/>
                    <FormButtonRow right>
                        <FormCreateButton onClick={handleCreateItem}/>
                    </FormButtonRow>
                </FormCard>
            </Center>
        </Page>
    )
}
