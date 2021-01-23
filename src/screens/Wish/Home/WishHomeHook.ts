import {Wish} from "../../../store/states";
import {useSelector} from "react-redux";
import {selectAllWishesByTripId} from "../../../store/selectors";
import {useState} from "react";


type Tab = { id: "all", title: "All" } | { id: "bought", title: "Bought" }| { id: "to buy", title: "To buy" }

const tabs: Readonly<Tab[]> = [
    {id: "all", title: "All"},
    {id: "bought", title: "Bought"},
    {id: "to buy", title: "To buy"},
]


type WishHome = {
    wishes: Readonly<Wish[]>,
    tabs: Readonly<Tab[]>,
    selectTab(tabId: string | null): void
}

const filterWishesByCurrentTab = (wishes: Readonly<Wish[]>, tab: Tab | undefined) => {
    if (!tab || tab.id === "all")
        return wishes;
    switch (tab.id) {
        case "bought":
            return wishes.filter(it => !!it.budgetExpenseId)
        case "to buy":
            return wishes.filter(it => !it.budgetExpenseId)
    }
}

export const useWishHome = (tripId: number): WishHome => {
    const wishes = useSelector(selectAllWishesByTripId(tripId))
    const [tab, setTab] = useState<Tab | undefined>()

    const selectTab = (tabId: string | null) => setTab(tabs.find(it => it.id === tabId))
    return {
        wishes: filterWishesByCurrentTab(wishes, tab),
        tabs: tabs,
        selectTab,
    }
}
