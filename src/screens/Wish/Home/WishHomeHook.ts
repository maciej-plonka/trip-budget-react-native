import {useSelector} from "react-redux";
import {selectAllWishesByTripId} from "../../../store/selectors";
import {useMemo, useState} from "react";
import {filterBy} from "../../../utils/Collections";
import {isBought, Wish} from "../../../store/models";
import {Id} from "../../../store";
import {SelectedBudgetCategory} from "./CategoryPicker";


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

const filterWishesByCategory = (wishes: ReadonlyArray<Wish>, selectedCategory: SelectedBudgetCategory) => {
    switch (selectedCategory.type) {
        case "All":
            return wishes;
        case "Essentials":
            return filterBy(wishes, "budgetCategoryId", undefined)
        case "Specific":
            return filterBy(wishes, "budgetCategoryId", selectedCategory.category.id);
    }
}

const filterWishes = (wishes: ReadonlyArray<Wish>, tab: Tab | undefined, category: SelectedBudgetCategory) => {
    return filterWishesByCategory(filterWishesByTab(wishes, tab), category);
}


export function useWishHome(tripId: Id) {
    const allWishes = useSelector(selectAllWishesByTripId(tripId))
    const [tab, setTab] = useState<Tab | undefined>()
    const [category, setCategory] = useState<SelectedBudgetCategory>({type: "All"})
    const wishes = useMemo(() => filterWishes(allWishes, tab, category), [category, tab, allWishes]);
    const selectTab = (tabId: Id | null) => setTab(tabs.find(it => it.id === tabId))
    return {tabs, wishes, category, selectTab, selectCategory: setCategory}
}
