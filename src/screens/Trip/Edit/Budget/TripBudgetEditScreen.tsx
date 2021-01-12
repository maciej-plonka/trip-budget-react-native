import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Screen} from "../../../Screen";
import BudgetProgress from "../../../../components/BudgetProgress";
import Card from "../../../../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {selectBudgetByTripId, selectBudgetCategoriesByBudgetId} from "../../../../store/selectors";
import {createBudgetCategoryWithUniqueId} from "../../../../store/actions";
import {BudgetCategory} from "../../../../store/states";
import {BudgetEditCard} from "./BudgetEditCard";
import {SelectedCategoryModal} from "./SelectedCategoryModal";
import {formatMoney} from "../../../../models/Money";
import {TripNavigationProps} from "../../../../navigation";


export const TripBudgetEditScreen = ({navigation, route}: TripNavigationProps<"TripBudgetEditScreen">) => {
    const dispatch = useDispatch()
    const budget = useSelector(selectBudgetByTripId(route.params.tripId))
    const categories = budget ? useSelector(selectBudgetCategoriesByBudgetId(budget.id)) : [];
    //new state
    const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null)

    const handleCreateCategory = () => {
        if (!budget) return;
        const budgetCategory = {
            budgetId: budget.id,
            categoryBudget: {amount: 0, currency: budget.totalBudget.currency},
            name: "New Category",
        }
        dispatch(createBudgetCategoryWithUniqueId(budgetCategory))
    }

    const selectCategory = (category: BudgetCategory | null) => {
        setSelectedCategory(category && JSON.parse(JSON.stringify(category)));
    }

    const handleOnSelectedCategoryChanged = () => selectCategory(null)

    useEffect(() => {
        !budget && navigation.goBack();
    }, [budget])

    return (
        <Screen title={"Edit budget"}>
            <View style={styles.root}>
                {budget ? (<BudgetProgress budget={budget}/>) : (<View/>)}
                {budget
                    ? (<BudgetEditCard onUpdate={navigation.goBack}
                                       onCreateCategory={handleCreateCategory}
                                       budget={budget}/>)
                    : (<View/>)
                }
                {selectedCategory
                    ? (<SelectedCategoryModal category={selectedCategory} onChanged={handleOnSelectedCategoryChanged}/>)
                    : (<View/>)
                }

                <FlatList style={styles.list} data={categories} keyExtractor={i => i.id.toString()}
                          renderItem={({item}) => (
                              <TouchableOpacity delayLongPress={200} onLongPress={() => selectCategory(item)}>
                                  <Card style={styles.category} rounded>
                                      <Text>{item.name}</Text>
                                      <Text>{formatMoney(item.categoryBudget)}</Text>
                                  </Card>
                              </TouchableOpacity>
                          )}/>


            </View>
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
