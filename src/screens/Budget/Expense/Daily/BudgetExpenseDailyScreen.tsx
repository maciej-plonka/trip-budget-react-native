import React, {useMemo} from "react";
import {BudgetNavigationProps} from "../../../../navigation";
import {useBudgetBottomDrawerNavigation} from "../../BudgetBottomDrawerNavigation";
import {Column, Screen, Space} from "../../../../components";
import {BudgetDailyExpenseList} from "./BudgetDailyExpenseList";
import {useBudgetDaily} from "./BudgetDailyExpenseHook";
import {BudgetDailyExpenseCard} from "./BudgetDailyExpenseCard";

export const BudgetExpenseDailyScreen = ({navigation, route}: BudgetNavigationProps<"BudgetExpenseDailyScreen">) => {
    const {dayTime, tripId, budgetId} = route.params
    const initialDay = useMemo(() => dayTime ? new Date(dayTime) : new Date(), [dayTime])
    const onNavigate = useBudgetBottomDrawerNavigation(navigation, tripId)
    const budgetDaily = useBudgetDaily(tripId, initialDay)
    const navigateToNewExpense = () => navigation.push("BudgetExpenseNewScreen", {budgetId, tripId})
    return (
        <Screen>
            <Screen.Header title={"Daily expenses"} color={"budget"} onTabChanged={budgetDaily.onDayChanged}>
                {budgetDaily.days.map(day => (
                    <Screen.Header.Tab
                        key={day}
                        initial={budgetDaily.isDaySelected(day)}
                        title={day}/>
                ))}
            </Screen.Header>
            <Screen.Content>
                <Column padding={16} marginBottom={64}>
                    {budgetDaily.currentDayDailyExpense && (
                        <>
                            <BudgetDailyExpenseCard dailyExpense={budgetDaily.currentDayDailyExpense}/>
                            <Space direction={"vertical"} size={8}/>
                            <BudgetDailyExpenseList
                                onNavigate={item => navigation.push("BudgetExpenseEditScreen", {tripId, expenseId: item.id})}
                                dailyExpense={budgetDaily.currentDayDailyExpense}
                                categories={budgetDaily.categories}/>
                        </>
                    )}
                </Column>
            </Screen.Content>
            <Screen.Fab onClick={navigateToNewExpense} position={"center"}/>
            <Screen.BottomDrawer current={"budget"} onNavigate={onNavigate}/>
        </Screen>
    )
}
