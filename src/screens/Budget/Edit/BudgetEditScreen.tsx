import {BudgetNavigationProps} from "../../../navigation";
import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {
    Button,
    Card,
    Column,
    enhanceFormik,
    FormCard,
    FormMoneyInput,
    Icon,
    Row,
    Screen,
    Space,
    TextWhite
} from "../../../components";
import {Formik, FormikHelpers} from "formik";
import {BudgetNewValues} from "../New/BudgetNewHook";
import {formatMoney} from "../../../models";
import {Budget} from "../../../store/models";
import {budgetEditValidationSchema, BudgetEditValues, useBudgetEdit} from "./BudgetEditHook";
import {EditCategoryModal} from "./EditCategoryModal";


export function BudgetEditScreen({route, navigation}: BudgetNavigationProps<"BudgetEditScreen">) {
    const {tripId, budgetId} = route.params
    const budgetEdit = useBudgetEdit(tripId, budgetId)

    useEffect(() => {
        budgetEdit.type == "NOT_FOUND" && navigation.pop();
    }, [budgetEdit.type])

    async function handleSubmit(values: BudgetNewValues, actions: FormikHelpers<BudgetNewValues>) {
        if (budgetEdit.type == "NOT_FOUND") return;
        const valid = await actions.validateForm(values)
        if (!valid) return;
        budgetEdit.update(values);
        navigation.pop();
    }

    if (budgetEdit.type == "NOT_FOUND") {
        return (<View/>)
    }

    return (
        <Screen>
            <Screen.Header title={"Edit trip budget"} color={"budget"}/>
            <Screen.Content>
                {budgetEdit.editedCategory && (
                    <EditCategoryModal
                        editedCategory={budgetEdit.editedCategory}
                        onClosed={() => budgetEdit.finishEditingCategory()}
                        onEdited={budgetEdit.finishEditingCategory}/>
                )}
                <Formik<BudgetEditValues>
                    initialValues={budgetEdit.initialValues}
                    validationSchema={budgetEditValidationSchema}
                    onSubmit={handleSubmit}>
                    {props => {
                        const {values} = props
                        const {setValueToValidate, hasErrors, error} = enhanceFormik(props);
                        return (
                            <Column padding={16}>
                                <FormCard>
                                    <FormMoneyInput
                                        label={"Budget"}
                                        value={values.totalBudget}
                                        error={error("totalBudget")}
                                        onChanged={setValueToValidate("totalBudget")}/>
                                    <Row>
                                        <Button onClick={props.handleSubmit} color={"primary"} disabled={hasErrors()}>
                                            <Icon iconType={"confirm"} size={18}/>
                                            <Space size={8} direction={"vertical"}/>
                                            <TextWhite>Update Budget</TextWhite>
                                        </Button>
                                        <Space size={8}/>

                                    </Row>
                                </FormCard>
                                <Space size={12} direction={"vertical"}/>
                                <Card padding={16}>
                                    <Column alignItems={"stretch"}>
                                        <Row justifyContent={"space-between"} alignItems={"center"}>
                                            <Text style={styles.categoryHeader}>Categories</Text>
                                            <Button
                                                onClick={budgetEdit.addCategory}
                                                color={"primary"}
                                                style={styles.categoryAddButton}>
                                                <Icon iconType={"plus"} size={18}/>
                                            </Button>
                                        </Row>
                                        {budgetEdit.categories.map((category, index) => (
                                            <Row
                                                key={index}
                                                style={styles.categoryItem}
                                                marginVertical={8}
                                                paddingTop={8}
                                                paddingBottom={0}>
                                                <Row justifyContent={"space-between"}>
                                                    <Column alignItems={"flex-start"}>
                                                        <Text>{category.name}</Text>
                                                        <Text>{formatMoney(category.categoryBudget)}</Text>
                                                    </Column>
                                                    <Row>
                                                        <Button
                                                            onClick={() => budgetEdit.editCategory(category)}
                                                            color={"primary"}
                                                            style={styles.categoryActionButton}>
                                                            <Icon iconType={"configure"} size={18}/>
                                                        </Button>
                                                        <Space size={8}/>
                                                        <Button
                                                            onClick={() => budgetEdit.removeCategory(category)}
                                                            color={"error"}
                                                            style={styles.categoryActionButton}>
                                                            <Icon iconType={"delete"} size={18}/>
                                                        </Button>
                                                    </Row>
                                                </Row>
                                            </Row>
                                        ))}
                                    </Column>

                                </Card>
                                <Space size={16}/>

                            </Column>
                        )
                    }}
                </Formik>
            </Screen.Content>
        </Screen>
    )
}


const styles = StyleSheet.create({
    categoryHeader: {
        fontSize: 16
    },
    categoryAddButton: {
        padding: 8,
    },
    categoryItem: {
        borderTopColor: '#bbb',
        borderTopWidth: 0.2,
    },
    categoryActionButton: {
        padding: 8,
    }
})
