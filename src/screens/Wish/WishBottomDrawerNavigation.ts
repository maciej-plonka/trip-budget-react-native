import {Id} from "../../store";
import {NavigationTarget} from "../../components/Screen/ButtonDrawer";
import {WishNavigation} from "../../navigation/Wish/WishNavigationProps";

export const useWishBottomDrawerNavigation = (navigation: WishNavigation<any>, tripId: Id) => (target: NavigationTarget) => {
    switch (target) {
        case "budget":
            navigation.navigate("Budget", {tripId})
            break;
        case "wish":
            navigation.navigate("Wish", {tripId})
            break;
    }
}
