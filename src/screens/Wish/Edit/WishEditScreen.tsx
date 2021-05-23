import {WishNavigationProps} from "../../../navigation";
import React, {useEffect} from "react";
import {
    Button,
    Card,
    Center,
    Column,
    enhanceFormik,
    FormButtonRow,
    FormCategorySelect,
    FormMoneyInput,
    FormTextArea,
    FormTextInput,
    Icon,
    ImagePicker,
    Screen,
    Space,
    TextWhite
} from "../../../components";
import {confirmMessageBox, showToast} from "../../../models";
import {ScrollView} from "react-native";
import {useWishEdit} from "./WishEditHook";
import {Formik, FormikHelpers} from "formik";
import {wishValidationSchema, WishValues} from "../WishValues";

export const WishEditScreen = ({navigation, route}: WishNavigationProps<"WishEditScreen">) => {
    const {tripId, itemId} = route.params
    const {categories, initialValues, exists, update, remove} = useWishEdit(itemId, tripId)
    useEffect(() => {
        !exists && navigation.navigate("WishHomeScreen", {...route.params})
    }, [exists])

    const handleDelete = async () => {
        const messageBoxOptions = {title: "Caution!", cardDescription: "Do you want to delete item?"};
        const shouldDelete = await confirmMessageBox(messageBoxOptions)
        if (!shouldDelete) {
            return;
        }
        remove()
        navigation.popToTop()
        showToast("Item deleted")
    }
    const handleSubmit = async (values: WishValues, actions: FormikHelpers<WishValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        update(values)
        showToast("Item updated")
        navigation.goBack()
    }

    return (
        <Screen>
            <Screen.Header title={"Edit wish"} color={"wish"}/>
            <Screen.Content>
                <ScrollView>
                    <Center style={{padding: 16}}>
                        <Formik<WishValues>
                            initialValues={initialValues}
                            validationSchema={wishValidationSchema}
                            onSubmit={handleSubmit}>
                            {props => {
                                const {values} = props
                                const {hasErrors, setValueToValidate, error} = enhanceFormik(props)
                                return (
                                    <Card>
                                        <ImagePicker value={values.image} onChanged={setValueToValidate("image")}/>
                                        <Column padding={16}>
                                            <FormCategorySelect
                                                label={"Category"}
                                                value={values.category}
                                                onChanged={setValueToValidate("category")}
                                                error={error("category")}
                                                values={categories}/>
                                            <FormMoneyInput
                                                label={"Value"}
                                                value={values.targetValue}
                                                onChanged={setValueToValidate("targetValue")}
                                                error={error("targetValue")}/>
                                            <FormTextInput
                                                label={"Name"}
                                                value={values.name}
                                                onChanged={setValueToValidate("name")}
                                                error={error("name")}/>
                                            <FormTextArea
                                                label={"Comments"}
                                                value={values.comments}
                                                onChanged={setValueToValidate("comments")}
                                                error={error("comments")}/>
                                            <FormButtonRow right>
                                                <Button onClick={handleDelete} color={"error"}>
                                                    <Icon iconType={"delete"} size={19}/>
                                                </Button>
                                                <Space size={8}/>
                                                <Button onClick={props.handleSubmit} color={"primary"}
                                                        disabled={hasErrors()}>
                                                    <Icon iconType={"confirm"} size={19}/>
                                                    <TextWhite>Edit</TextWhite>
                                                </Button>
                                            </FormButtonRow>
                                        </Column>
                                    </Card>
                                )
                            }}
                        </Formik>
                    </Center>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
