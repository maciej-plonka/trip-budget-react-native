import {useSelector} from "react-redux";
import {selectAllWishesByTripId, selectBudgetCategoriesByBudgetId} from "../../../store/selectors";
import {useState} from "react";
import {filterBy} from "../../../utils/Collections";
import {BudgetCategory, isBought, Wish} from "../../../store/models";
import {Id} from "../../../store";


type Tab = { id: "all", title: "All" } | { id: "bought", title: "Bought" } | { id: "to buy", title: "To buy" }

const tabs: ReadonlyArray<Tab> = [
    {id: "all", title: "All"},
    {id: "bought", title: "Bought"},
    {id: "to buy", title: "To buy"},
]

const filterWishesByTab = (wishes: ReadonlyArray<Wish>, tab: Tab | undefined) => {
    if (!tab || tab.id === "all")
        return wishes;
    switch (tab.id) {
        case "bought":
            return wishes.filter(it => isBought(it))
        case "to buy":
            return wishes.filter(it => !isBought(it))
    }
}

const filterWishesByCategory = (wishes: ReadonlyArray<Wish>, category: BudgetCategory | undefined) => {
    return category ? filterBy(wishes, "budgetCategoryId", category.id) : wishes
}

const filterWishes = (wishes: ReadonlyArray<Wish>, tab: Tab | undefined, category: BudgetCategory | undefined) => {
    return filterWishesByCategory(filterWishesByTab(wishes, tab), category);
}

type WishHome = {
    wishes: ReadonlyArray<Wish>,
    tabs: ReadonlyArray<Tab>,
    categories: ReadonlyArray<BudgetCategory>
    category: BudgetCategory | undefined,
    selectTab(tabId: string | null): void,
    selectCategory(category: BudgetCategory | undefined): void,
}

export const useWishHome = (tripId: Id): WishHome => {
    const allWishes = useSelector(selectAllWishesByTripId(tripId))
    const categories = useSelector(selectBudgetCategoriesByBudgetId(tripId))
    const [tab, setTab] = useState<Tab | undefined>()
    const [category, setCategory] = useState<BudgetCategory | undefined>()
    const wishes = filterWishes(allWishes, tab, category);
    const selectTab = (tabId: Id | null) => setTab(tabs.find(it => it.id === tabId))
    const selectCategory = (category: BudgetCategory | undefined) => setCategory(category)
    return {tabs, wishes, categories, category, selectTab, selectCategory}
}
