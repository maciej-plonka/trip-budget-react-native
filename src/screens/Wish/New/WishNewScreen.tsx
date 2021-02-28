import {WishNavigationProps} from "../../../navigation";
import React from "react";
import {
    Button,
    Center,
    FormButtonRow,
    FormCard,
    FormCategorySelect,
    FormImagePicker,
    FormMoneyInput,
    FormTextInput,
    Icon,
    Screen,
    TextWhite
} from "../../../components";
import {useWishNew} from "./WishNewHook";
import {ScrollView} from "react-native";
import {showToast} from "../../../models";
import {Formik, FormikHelpers} from "formik";
import {wishValidationSchema, WishValues} from "../WishValues";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";

export const WishNewScreen = ({route, navigation}: WishNavigationProps<"WishNewScreen">) => {
    const {categories, initialValues, create} = useWishNew(route.params.tripId)

    const handleSubmit = async (values: WishValues, actions: FormikHelpers<WishValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        create(values)
        showToast("Item created")
        navigation.goBack()
    }
    return (
        <Screen>
            <Screen.Header title={"New item"} color={"wish"}/>
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
                                const avatar = <FormImagePicker value={values.image}
                                                                onChanged={setValueToValidate("image")}/>
                                return (
                                    <FormCard avatar={avatar}>
                                        <FormCategorySelect
                                            label={"Category"}
                                            value={values.category}
                                            onChanged={setValueToValidate("category")}
                                            error={error("category")}
                                            values={categories}/>
                                        <FormMoneyInput
                                            label={"Value"}
                                            value={values.targetValue}
                                            error={error("targetValue")}
                                            onChanged={setValueToValidate("targetValue")}/>
                                        <FormTextInput label={"Name"}
                                                       value={values.name}
                                                       error={error("name")}
                                                       onChanged={setValueToValidate("name")}/>
                                        <FormButtonRow right>
                                            <Button onClick={props.handleSubmit} color={"primary"}
                                                    disabled={hasErrors()}>
                                                <Icon iconType={"confirm"} size={19}/>
                                                <TextWhite>Create</TextWhite>
                                            </Button>
                                        </FormButtonRow>
                                    </FormCard>
                                )
                            }}
                        </Formik>

                    </Center>
                </ScrollView>
            </Screen.Content>
        </Screen>
    )
}
