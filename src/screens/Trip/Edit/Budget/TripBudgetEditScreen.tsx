import React, {useEffect} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {
    Card,
    FormAddButton,
    FormButtonRow,
    FormCard,
    FormConfigureButton,
    FormMoneyInput,
    FormUpdateButton,
    MoneyLinearProgressBar,
    Screen
} from "../../../../components";
import {Budget, sumCategoriesBudget} from "../../../../store/states";
import {SelectedCategoryModal} from "./SelectedCategoryModal";
import {formatMoney} from "../../../../models/Money";
import {TripNavigationProps} from "../../../../navigation";
import {useTripBudgetEdit} from "./TripBudgetEditHook";
import {useThemeContext} from "../../../../contexts/ThemeContext";

export const TripBudgetEditScreen = ({navigation, route}: TripNavigationProps<"TripBudgetEditScreen">) => {
    const budget = useTripBudgetEdit(route.params.tripId);
    const theme = useThemeContext()
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
                    <Card style={{padding: 16, marginBottom: 8}}>
                        <MoneyLinearProgressBar color={theme.colors.primary} max={budget.totalBudget} current={sumCategoriesBudget(budget.categories)}/>
                    </Card>
                    <FormCard>
                        <FormMoneyInput label={"Budget"} value={budget.totalBudget} onChanged={budget.setTotalBudget}/>
                        <FormButtonRow right>
                            <FormAddButton onClick={handleCreateCategory}/>
                            <FormUpdateButton onClick={budget.update}/>
                        </FormButtonRow>
                    </FormCard>


                    <FlatList style={styles.list} data={budget.categories} keyExtractor={i => i.id.toString()}
                              renderItem={({item}) => (
                                  <Card style={styles.category} rounded>
                                      <View style={styles.categoryText}>
                                          <Text>{item.name}</Text>
                                          <Text>{formatMoney(item.categoryBudget)}</Text>
                                      </View>

                                      <FormConfigureButton onClick={() => budget.selectCategory(item)} />
                                  </Card>
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
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        marginTop: 4,
        marginBottom: 4,
    },
    categoryText: {
        flexDirection: "column"
    }
});
