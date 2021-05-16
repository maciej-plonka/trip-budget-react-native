import React, {useEffect} from "react";
import {BudgetNavigationProps} from "../../../navigation";
import {Button, Card, Column, FormCard, FormMoneyInput, Icon, Row, Screen, Space, TextWhite} from "../../../components";
import {formatMoney} from "../../../models";
import {Formik, FormikHelpers} from "formik";
import {enhanceFormik} from "../../../components/Form/FormikEnhanced";
import {StyleSheet, Text} from "react-native";
import {CategoryModal} from "./CategoryModal";
import {budgetNewValidationSchema, BudgetNewValues, useBudgetNew} from "./BudgetNewHook";

export function BudgetNewScreen({route, navigation}: BudgetNavigationProps<"BudgetNewScreen">) {
    const tripId = route.params.tripId;
    const budgetNew = useBudgetNew(tripId);

    useEffect(() => {
        const {budget} = budgetNew
        budget && navigation.replace("BudgetHomeScreen", {tripId})
    }, [budgetNew.budget])

    const handleSubmit = async (values: BudgetNewValues, actions: FormikHelpers<BudgetNewValues>) => {
        const valid = await actions.validateForm(values)
        if (!valid) return;
        budgetNew.create(values);
    }

    return (
        <Screen>
            <Screen.Header title={"New Budget"} color={"budget"}/>
            <Screen.Content>
                {budgetNew.editedCategory && (
                    <CategoryModal
                        category={budgetNew.editedCategory}
                        onClosed={budgetNew.stopEditingCategory}
                        onEdited={budgetNew.updateEditedCategory}/>
                )}
                <Formik<BudgetNewValues>
                    initialValues={budgetNew.initialValues}
                    validationSchema={budgetNewValidationSchema}
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
                                            <TextWhite>Create Budget</TextWhite>
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
                                                onClick={budgetNew.addCategory}
                                                color={"primary"}
                                                style={styles.categoryAddButton}>
                                                <Icon iconType={"plus"} size={18}/>
                                            </Button>
                                        </Row>
                                        {budgetNew.categories.map((category, index) => (
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
                                                            onClick={() => budgetNew.editCategory(index)}
                                                            color={"primary"}
                                                            style={styles.categoryActionButton}>
                                                            <Icon iconType={"configure"} size={18}/>
                                                        </Button>
                                                        <Space size={8}/>
                                                        <Button
                                                            onClick={() => budgetNew.removeCategory(index)}
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
