import {BudgetNavigationProps} from "../../../navigation";
import {StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useMemo} from "react";
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
import {defaultMoney, formatMoney, Money} from "../../../models";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetById, selectBudgetCategoriesByBudgetId} from "../../../store/selectors";
import {Id} from "../../../store";
import * as yup from "yup";
import {moneySchema} from "../../../validation";
import {
    createBudgetCategory,
    deleteBudgetCategoryById,
    updateBudgetCategory
} from "../../../store/actions/BudgetActions";
import {Budget, BudgetCategory} from "../../../store/models";

type BudgetEditValues = {
    totalBudget: Money,
}
const budgetEditValidationSchema = yup.object().shape({
    totalBudget: moneySchema
})

type BudgetEdit = { type: "NOT_FOUND" } |
    {
        type: "FOUND",
        initialValues: BudgetEditValues
        categories: ReadonlyArray<BudgetCategory>
        update(values: BudgetEditValues): void,
        addCategory(): void,
        editCategory(category: BudgetCategory): void,
        removeCategory(category: BudgetCategory): void
    }


function useBudgetEdit(tripId: Id, budgetId: Id): BudgetEdit {
    const dispatch = useDispatch()
    const budget = useSelector(selectBudgetById(budgetId));
    const categories = useSelector(selectBudgetCategoriesByBudgetId(budgetId))
    const update = useCallback((values: BudgetEditValues) => {

    }, []);
    const initialValues = useMemo(() => ({
        totalBudget: budget?.totalBudget ?? defaultMoney()
    }), [budget]);

    const addCategory = useCallback(() => {
        const newCategory = {
            name: "New category",
            budgetId,
            categoryBudget: defaultMoney()
        };
        dispatch(createBudgetCategory(newCategory))
    }, [budgetId]);


    const editCategory = useCallback((category: BudgetCategory) => {
        dispatch(updateBudgetCategory(category));
    }, [])

    const removeCategory = useCallback((category: BudgetCategory) => {
        dispatch(deleteBudgetCategoryById(category.id))
    }, [])

    if (!budget)
        return {type: "NOT_FOUND"};

    return {
        type: "FOUND",
        initialValues,
        categories,
        update,
        addCategory,
        editCategory,
        removeCategory,
    }
}

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
    }

    if (budgetEdit.type == "NOT_FOUND") {
        return (<View/>)
    }

    return (
        <Screen>
            <Screen.Header title={"Edit trip budget"} color={"budget"}/>
            <Screen.Content>
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
