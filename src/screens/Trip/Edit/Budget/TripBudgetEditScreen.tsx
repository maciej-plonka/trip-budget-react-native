import React, {useEffect} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Card from "../../../../components/Card";
import {Budget, sumCategoriesBudget} from "../../../../store/states";
import {SelectedCategoryModal} from "./SelectedCategoryModal";
import {formatMoney} from "../../../../models/Money";
import {TripNavigationProps} from "../../../../navigation";
import {Screen} from "../../../../components/Screen";
import {Progress} from "../../../../components/BudgetProgress";
import {FormAddButton, FormButtonRow, FormCard, FormMoneyInput, FormUpdateButton} from "../../../../components/Form";
import {useTripBudgetEdit} from "./TripBudgetEditHook";

export const TripBudgetEditScreen = ({navigation, route}: TripNavigationProps<"TripBudgetEditScreen">) => {
    const budget = useTripBudgetEdit(route.params.tripId);
    useEffect(() => {
        !budget && navigation.goBack();
    }, [budget])

    if (!budget) return (<View/>)

    const handleCreateCategory = () => budget.addCategory('New category')
    const handleOnSelectedCategoryChanged = () => budget.selectCategory(null)
    return (
        <Screen>
            <Screen.Header title={"Edit budget"}/>
            <Screen.Content>
                <View style={styles.root}>
                    <Progress maxValue={budget.totalBudget} currentValue={sumCategoriesBudget(budget.categories)}/>
                    <FormCard>
                        <FormMoneyInput label={"Budget"} value={budget.totalBudget} onChanged={budget.setTotalBudget}/>
                        <FormButtonRow right>
                            <FormAddButton onClick={handleCreateCategory}/>
                            <FormUpdateButton onClick={budget.update}/>
                        </FormButtonRow>
                    </FormCard>


                    <FlatList style={styles.list} data={budget.categories} keyExtractor={i => i.id.toString()}
                              renderItem={({item}) => (
                                  <TouchableOpacity delayLongPress={200}
                                                    onLongPress={() => budget.selectCategory(item)}>
                                      <Card style={styles.category} rounded>
                                          <Text>{item.name}</Text>
                                          <Text>{formatMoney(item.categoryBudget)}</Text>
                                      </Card>
                                  </TouchableOpacity>
                              )}/>
                    {!!budget.selectedCategory && (
                        <SelectedCategoryModal category={budget.selectedCategory}
                                               onChanged={handleOnSelectedCategoryChanged}/>)
                    }

                </View>
            </Screen.Content>
        </Screen>
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
