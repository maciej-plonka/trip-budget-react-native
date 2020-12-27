import React, {useState} from "react";
import {TripNavigationProps} from "../TripParamList";
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useBudgetsContext, useBudgetsDispatcherContext} from "../../../contexts/BudgetsContext";
import Page from "../../Page";
import {
    FormAddButton,
    FormButtonRow,
    FormCard,
    FormDeleteButton,
    FormMoneyInput,
    FormTextInput,
    FormUpdateButton
} from "../../../components/Form";
import {Budget, BudgetCategory} from "../../../domain/Budget";
import BudgetProgress from "../../../components/BudgetProgress";
import Card from "../../../components/Card";
import Center from "../../../components/Center/Center";

const lastId = (categories: BudgetCategory[]) => categories.map(it => it.id).reduce((a, b) => a > b ? a : b, 0)
const createNewBudget = (id: number): BudgetCategory => ({
    id,
    name: 'New category',
    value: {amount: 0, currency: "¥"}
})

const calculateCurrentBudget = (categories: BudgetCategory[]) :Money => ({
    currency: categories[0]?.value.currency ?? "¥",
    amount:  categories.map(it => it.value.amount).reduce((a, b) => a + b, 0)
})

const formatMoney = ({amount, currency}: Money) => `${amount}${currency}`
const UpdateTripBudgetPage = ({navigation, route}: TripNavigationProps<"UpdateTripBudgetPage">) => {
    const budget = useBudgetsContext().find(it => it.tripId === route.params.tripId)
    if (!budget) {
        navigation.goBack()
        return (<View/>)
    }
    const dispatch = useBudgetsDispatcherContext()
    const [totalBudget, setTotalBudget] = useState<number>(budget.value.amount)
    const [categories, setCategories] = useState<BudgetCategory[]>(budget.categories);
    const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null)
    const updateSelectedCategoryName = (name: string) => setSelectedCategory(previous => previous && ({
        ...previous,
        name
    }));
    const updateSelectedCategoryAmount = (amount: number) => setSelectedCategory(previous => previous && ({
        ...previous,
        value: ({...previous.value, amount})
    }));

    const updateCategory = (category: BudgetCategory) => {
        setCategories(previous => previous.map(it => it.id === category.id ? category : it));
        selectCategory(null)
    }
    const addCategory = () => {
        setCategories(previous => [...previous, createNewBudget(lastId(previous) + 1)])
    }
    const deleteCategory = (id: number) => {
        setCategories(previous => previous.filter(it => it.id !== id))
        selectCategory(null)
    }

    const selectCategory = (category: BudgetCategory | null) => {
        setSelectedCategory(category && JSON.parse(JSON.stringify(category)));
    }

    const updateBudget = async () => {
        const budgetToUpdate: Budget = {
            ...budget,
            categories,
            value: {...budget.value, amount: totalBudget},
        }
        await dispatch({type: "update", budgetToUpdate})
        navigation.goBack()
    }

    return (
        <Page title={"Update budget"}>
            <View style={styles.root}>
                <BudgetProgress maxValue={budget.value} currentValue={calculateCurrentBudget(categories)}/>
                <FormCard>
                    <FormMoneyInput label={"Budget"} value={totalBudget} onChanged={setTotalBudget}/>
                    <FormButtonRow right>
                        <FormAddButton onClick={addCategory}/>
                        <FormUpdateButton onClick={updateBudget}/>
                    </FormButtonRow>
                </FormCard>

                <Modal
                    style={StyleSheet.absoluteFill}
                    animationType="slide"
                    visible={!!selectedCategory}>
                    {!!selectedCategory
                        ? (
                            <Center styles={StyleSheet.absoluteFill}>
                                <FormCard>
                                    <FormTextInput label={"Name"} value={selectedCategory.name}
                                                   onChanged={updateSelectedCategoryName}/>
                                    <FormMoneyInput label={"Budget"} value={selectedCategory.value.amount}
                                                    onChanged={updateSelectedCategoryAmount}/>
                                    <FormButtonRow>
                                        <FormDeleteButton onClick={() => deleteCategory(selectedCategory.id)}/>
                                        <FormUpdateButton onClick={() => updateCategory(selectedCategory)}/>
                                    </FormButtonRow>
                                </FormCard>
                            </Center>

                        )
                        : (<View/>)
                    }
                </Modal>
                <FlatList style={styles.list} data={categories} keyExtractor={i => i.id.toString()}
                          renderItem={({item}) => (
                              <TouchableOpacity delayLongPress={200} onLongPress={() => selectCategory(item)}>
                                  <Card style={styles.category} rounded>
                                      <Text>{item.name}</Text>
                                      <Text>{formatMoney(item.value)}</Text>
                                  </Card>
                              </TouchableOpacity>
                          )}/>


            </View>
        </Page>

    )
};

const styles = StyleSheet.create({
    root: {
        flexDirection: "column",
        padding: 16,
        flex: 1,
    },
    list: {
        marginVertical: 4,
    },
    category: {
        padding: 16,
        marginTop: 4,
        marginBottom: 4,
    }
});

export default UpdateTripBudgetPage;
