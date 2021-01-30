import {WishNavigationProps} from "../../../navigation";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormCategoryPicker,
    FormMoneyInput,
    FormTextArea,
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByTripId, selectWishById} from "../../../store/selectors";
import {Money} from "../../../models/Money";
import {BudgetCategory} from "../../../store/states";
import {StyleSheet, View} from "react-native";
import {buyWish} from "../../../store/actions";
import {showToast} from "../../../models/Toast";


type WishBuy = {
    name: string,
    setName(name: string): void,
    targetValue: Money
    setTargetValue(targetValue: Money): void
    actualValue: Money,
    setActualValue(actualValue: Money): void,
    comments: string,
    setComments(comments:string): void,
    category: BudgetCategory | undefined
    setCategory(category: BudgetCategory | undefined): void
    categories: Readonly<BudgetCategory[]>
    buy(): void
}
const useWishBuy = (itemId: number): WishBuy | undefined => {
    const wish = useSelector(selectWishById(itemId))
    if(!wish) {
        return;
    }
    const dispatch = useDispatch()
    const categories = useSelector(selectBudgetCategoriesByTripId(wish.tripId))
    const [name, setName] = useState<string>(wish.name)
    const [actualValue, setActualValue] = useState<Money>(wish.targetValue)
    const [targetValue, setTargetValue] = useState<Money>(wish.targetValue)
    const [comments, setComments] = useState<string>(wish.comments)
    const [category, setCategory] = useState<BudgetCategory | undefined>(categories.find(it => it.id === wish.budgetCategoryId))

    const buy = () => dispatch(buyWish({
        ...wish,
        name,
        actualValue,
        targetValue,
        comments,
        budgetCategoryId: category?.id
    }))
    return {
        name, setName,
        targetValue, setTargetValue,
        actualValue, setActualValue,
        comments, setComments,
        category, setCategory, categories,
        buy

    }
}

export const WishBuyScreen = ({route, navigation}:WishNavigationProps<"WishBuyScreen">) => {
    const wishBuy = useWishBuy(route.params.itemId)
    useEffect(() => {
        !wishBuy && navigation.navigate("WishHomeScreen", {...route.params})
    }, [wishBuy]);

    if(!wishBuy) {
        return (<View/>)
    }
    const onBuy = () => {
        wishBuy.buy()
        showToast("Item bought")
        navigation.goBack()
    }
    return (
        <Screen>
            <Screen.Header title={"Wish buy"} color={"wish"} />
            <Screen.Content>
                <Center styles={styles.root}>
                    <FormCard>
                        <FormTextInput value={wishBuy.name} onChanged={wishBuy.setName} label={"Name"} icon={"name"}/>
                        <FormMoneyInput value={wishBuy.targetValue} onChanged={wishBuy.setTargetValue} label={"Target value"} />
                        <FormMoneyInput value={wishBuy.actualValue} onChanged={wishBuy.setActualValue} label={"Actual value"} />
                        <FormCategoryPicker value={wishBuy.category} onChanged={wishBuy.setCategory} values={wishBuy.categories} label={"Category"} />
                        <FormTextArea value={wishBuy.comments} onChanged={wishBuy.setComments} label={"Comments"} />
                        <FormButtonRow right>
                            <Button style={styles.button} onClick={onBuy} color={"secondary"} >
                                <Icon iconType={"cart"} size={16} />
                                <TextWhite>Buy</TextWhite>
                            </Button>
                        </FormButtonRow>
                    </FormCard>
                </Center>
            </Screen.Content>
        </Screen>
    )
}


const styles = StyleSheet.create({
    root: {
        padding: 16,
    },
    button: {
        paddingHorizontal: 16
    }
});
