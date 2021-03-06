import {WishNavigationProps} from "../../../navigation";
import {
    Button,
    FormButtonRow,
    FormCard,
    FormCategorySelect,
    FormMoneyInput,
    FormTextArea,
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import React, {useEffect} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {showToast} from "../../../models";
import {useWishBuy, wishBuyValidationSchema, WishBuyValues} from "./WishBuyHook";
import {Formik, FormikHelpers} from "formik";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";


export const WishBuyScreen = ({route, navigation}: WishNavigationProps<"WishBuyScreen">) => {
    const {tripId, itemId} = route.params
    const {categories, initialValues, exists, buy} = useWishBuy(tripId, itemId)
    useEffect(() => {
        !exists && navigation.navigate("WishHomeScreen", {...route.params})
    }, [exists]);

    const handleSubmit = async (values: WishBuyValues, actions: FormikHelpers<WishBuyValues>) => {
        const valid = await actions.validateForm(values);
        if (!valid) return;
        buy(values)
        showToast("Item bought")
        navigation.goBack()
    }
    return (
        <Screen>
            <Screen.Header title={"Wish buy"} color={"wish"}/>
            <Screen.Content>
                <ScrollView style={styles.root}>
                    <Formik<WishBuyValues>
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={wishBuyValidationSchema}>
                        {props => {
                            const {values} = props
                            const {setValueToValidate, hasErrors, error} = enhanceFormik(props)
                            return (
                                <FormCard>
                                    <FormTextInput
                                        label={"Name"}
                                        value={values.name}
                                        error={error("name")}
                                        onChanged={setValueToValidate("name")}/>
                                    <FormMoneyInput
                                        label={"Target value"}
                                        value={values.targetValue}
                                        error={error("targetValue")}
                                        onChanged={setValueToValidate("targetValue")}/>
                                    <FormMoneyInput
                                        label={"Actual value"}
                                        value={values.actualValue}
                                        error={error("actualValue")}
                                        onChanged={setValueToValidate("actualValue")}/>
                                    <FormCategorySelect
                                        label={"Category"}
                                        values={categories}
                                        value={values.category}
                                        error={error("category")}
                                        onChanged={setValueToValidate("category")}/>
                                    <FormTextArea
                                        label={"Comments"}
                                        value={values.comments}
                                        error={error("comments")}
                                        onChanged={setValueToValidate("comments")}/>
                                    <FormButtonRow right>
                                        <Button style={styles.button} onClick={props.handleSubmit} color={"secondary"}
                                                disabled={hasErrors()}>
                                            <Icon iconType={"cart"} size={16}/>
                                            <TextWhite>Buy</TextWhite>
                                        </Button>
                                    </FormButtonRow>
                                </FormCard>

                            )
                        }}
                    </Formik>

                </ScrollView>
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
