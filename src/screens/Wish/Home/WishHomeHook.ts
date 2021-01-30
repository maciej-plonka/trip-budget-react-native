import {BudgetCategory, isBought, Wish} from "../../../store/states";
import {useSelector} from "react-redux";
import {selectAllWishesByTripId, selectBudgetCategoriesByTripId} from "../../../store/selectors";
import {useState} from "react";
import {filterBy} from "../../../utils/Collections";


type Tab = { id: "all", title: "All" } | { id: "bought", title: "Bought" } | { id: "to buy", title: "To buy" }

const tabs: Readonly<Tab[]> = [
    {id: "all", title: "All"},
    {id: "bought", title: "Bought"},
    {id: "to buy", title: "To buy"},
]

const filterWishesByTab = (wishes: Readonly<Wish[]>, tab: Tab | undefined) => {
    if (!tab || tab.id === "all")
        return wishes;
    switch (tab.id) {
        case "bought":
            return wishes.filter(it => isBought(it))
        case "to buy":
            return wishes.filter(it => !isBought(it))
    }
}

const filterWishesByCategory = (wishes: Readonly<Wish[]>, category: BudgetCategory | undefined) => {
    if (!category) {
        return wishes;
    }
    return filterBy(wishes, "budgetCategoryId", category.id)
}

const filterWishes = (wishes: Readonly<Wish[]>, tab: Tab | undefined, category: BudgetCategory | undefined) => {
    return filterWishesByCategory(filterWishesByTab(wishes, tab), category);
}

type WishHome = {
    wishes: Readonly<Wish[]>,
    tabs: Readonly<Tab[]>,
    categories: Readonly<BudgetCategory[]>
    category: BudgetCategory | undefined,
    selectTab(tabId: string | null): void,
    selectCategory(category: BudgetCategory | undefined): void,
}

export const useWishHome = (tripId: number): WishHome => {
    const allWishes = useSelector(selectAllWishesByTripId(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const [tab, setTab] = useState<Tab | undefined>()
    const [category, setCategory] = useState<BudgetCategory | undefined>()
    const wishes = filterWishes(allWishes, tab, category);
    const selectTab = (tabId: string | null) => setTab(tabs.find(it => it.id === tabId))
    const selectCategory = (category: BudgetCategory | undefined) => setCategory(category)
    return {tabs, wishes, categories, category, selectTab, selectCategory}
}
