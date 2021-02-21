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
import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {showToast} from "../../../models/Toast";
import {useWishBuy} from "./WishBuyHook";


export const WishBuyScreen = ({route, navigation}: WishNavigationProps<"WishBuyScreen">) => {
    const wishBuy = useWishBuy(route.params.itemId)
    useEffect(() => {
        !wishBuy && navigation.navigate("WishHomeScreen", {...route.params})
    }, [wishBuy]);

    if (!wishBuy) {
        return (<View/>)
    }
    const onBuy = () => {
        wishBuy.buy()
        showToast("Item bought")
        navigation.goBack()
    }
    return (
        <Screen>
            <Screen.Header title={"Wish buy"} color={"wish"}/>
            <Screen.Content>
                <Center style={styles.root}>
                    <FormCard>
                        <FormTextInput value={wishBuy.name} onChanged={wishBuy.setName} label={"Name"} icon={"notes"}/>
                        <FormMoneyInput value={wishBuy.targetValue} onChanged={wishBuy.setTargetValue}
                                        label={"Target value"}/>
                        <FormMoneyInput value={wishBuy.actualValue} onChanged={wishBuy.setActualValue}
                                        label={"Actual value"}/>
                        <FormCategoryPicker value={wishBuy.category} onChanged={wishBuy.setCategory}
                                            values={wishBuy.categories} label={"Category"}/>
                        <FormTextArea value={wishBuy.comments} onChanged={wishBuy.setComments} label={"Comments"}/>
                        <FormButtonRow right>
                            <Button style={styles.button} onClick={onBuy} color={"secondary"}>
                                <Icon iconType={"cart"} size={16}/>
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
