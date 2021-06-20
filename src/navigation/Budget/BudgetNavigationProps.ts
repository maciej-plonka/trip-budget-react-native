import {StackNavigationProp} from "@react-navigation/stack";
import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {Id} from "../../store";
import {RootParamList} from "../RootNavigationProps";

type BaseScreenParam = {
    tripId: Id
}
export type BudgetParamList = {
    BudgetNewScreen: BaseScreenParam,
    BudgetHomeScreen: BaseScreenParam,
    BudgetEditScreen: BaseScreenParam & { budgetId: Id }
    BudgetExpenseNewScreen: BaseScreenParam & { budgetId: Id },
    BudgetExpenseEditScreen: BaseScreenParam & { expenseId: Id },
    BudgetExpenseDailyScreen: BaseScreenParam & { budgetId: Id, dayTime?: number }
    BudgetCategoryEditScreen: BaseScreenParam & { budgetId: Id }
}

export type BudgetNavigation<T extends keyof BudgetParamList> = CompositeNavigationProp<StackNavigationProp<BudgetParamList, T>,
    StackNavigationProp<RootParamList, "Budget">>

export type BudgetNavigationProps<T extends keyof BudgetParamList> = {
    navigation: BudgetNavigation<T>
    route: RouteProp<BudgetParamList, T>
}
