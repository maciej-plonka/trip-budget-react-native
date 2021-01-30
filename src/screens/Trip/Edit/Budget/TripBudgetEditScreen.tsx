import React, {useEffect} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {
    Button,
    Card,
    FormButtonRow,
    FormCard,
    FormMoneyInput,
    Icon,
    MoneyLinearProgressBar,
    Screen,
    Space,
    TextWhite
} from "../../../../components";
import {Budget, sumCategoriesBudget} from "../../../../store/states";
import {SelectedCategoryModal} from "./SelectedCategoryModal";
import {formatMoney} from "../../../../models/Money";
import {TripNavigationProps} from "../../../../navigation";
import {useTripBudgetEdit} from "./TripBudgetEditHook";
import {usePrimaryColor} from "../../../../contexts/ThemeContext";
import {showToast} from "../../../../models/Toast";

export const TripBudgetEditScreen = ({navigation, route}: TripNavigationProps<"TripBudgetEditScreen">) => {
    const budget = useTripBudgetEdit(route.params.tripId);
    const primaryColor = usePrimaryColor()
    useEffect(() => {
        !budget && navigation.goBack();
    }, [budget])

    if (!budget) return (<View/>)

    const handleCreateCategory = () => budget.addCategory('New category')
    const handleOnSelectedCategoryChanged = () => budget.selectCategory(null)
    const handleUpdateBudget = () => {
        budget.update()
        showToast("Budget updated")
        navigation.goBack()
    }
    return (
        <Screen>
            <Screen.Header title={"Edit budget"}/>
            <Screen.Content>
                <View style={styles.root}>
                    <Card style={{padding: 16, marginBottom: 8}}>
                        <MoneyLinearProgressBar color={primaryColor} max={budget.totalBudget} current={sumCategoriesBudget(budget.categories)}/>
                    </Card>
                    <FormCard>
                        <FormMoneyInput label={"Budget"} value={budget.totalBudget} onChanged={budget.setTotalBudget}/>
                        <FormButtonRow right>
                            <Button onClick={handleCreateCategory} color={"primary"} >
                                <Icon iconType={"plus"} size={19} />
                            </Button>
                            <Space size={8} />
                            <Button onClick={handleUpdateBudget} color={"primary"} >
                                <Icon iconType={"confirm"} size={19} />
                                <TextWhite>Confirm</TextWhite>
                            </Button>
                        </FormButtonRow>
                    </FormCard>


                    <FlatList style={styles.list} data={budget.categories} keyExtractor={i => i.id.toString()}
                              renderItem={({item}) => (
                                  <Card style={styles.category} rounded>
                                      <View style={styles.categoryText}>
                                          <Text>{item.name}</Text>
                                          <Text>{formatMoney(item.categoryBudget)}</Text>
                                      </View>
                                      <Button onClick={() => budget.selectCategory(item)} color={"primary"} >
                                          <Icon iconType={"configure"} size={19} />
                                      </Button>
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
