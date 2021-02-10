import {BudgetNavigation} from "../../navigation";
import {NavigationTarget} from "../../components/Screen/ButtonDrawer";
import {Id} from "../../store";

export const useBudgetBottomDrawerNavigation = (navigation: BudgetNavigation<any>, tripId: Id) => (target: NavigationTarget) =>  {
    switch (target){
        case "budget":
            navigation.navigate("Budget", {tripId})
            break;
        case "wish":
            navigation.navigate("Wish",{tripId})
            break;
    }
}
