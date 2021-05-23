import {BudgetNavigation} from "../../navigation";
import {NavigationTarget} from "../../components/Screen/ButtonDrawer";
import {Id} from "../../store";
import {useCallback} from "react";

export function useBudgetBottomDrawerNavigation(navigation: BudgetNavigation<any>, tripId: Id) {
    return useCallback(function (target: NavigationTarget) {
        switch (target) {
            case "budget":
                navigation.navigate("Budget", {tripId})
                break;
            case "wish":
                navigation.navigate("Wish", {tripId})
                break;
        }
    }, [tripId]);
}
