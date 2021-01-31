import {buildMoney, defaultMoney, Money} from "../../../../models/Money";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {BudgetCategory} from "../../../../store/models";
import {Id} from "../../../../store";
import {selectBudgetCategoriesByTripId, selectTripById} from "../../../../store/selectors";
import {createBudgetCategory} from "../../../../store/actions/BudgetActions";
import {updateTrip} from "../../../../store/actions/TripActions";

type BudgetEdit = {
    totalBudget: Money,
    categories: Readonly<BudgetCategory[]>
    addCategory(name: string): void
    selectedCategory: BudgetCategory | null
    selectCategory(category: BudgetCategory | null): void,
}

function breakReference<T>(t: T ): T {
    return JSON.parse(JSON.stringify(t));
}

export const useTripBudgetEdit = (tripId: Id): BudgetEdit | undefined => {
    const dispatch = useDispatch()
    const trip  = useSelector(selectTripById(tripId))
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId));
    const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null)
    if(!trip) {
        return;
    }
    const addCategory = (name: string) => {
        const categoryBudget = buildMoney(0, trip.totalBudget.currency)
        dispatch(createBudgetCategory({ tripId,categoryBudget, name}))
    }
    const selectCategory = (category: BudgetCategory | null) => setSelectedCategory(category && breakReference(category));

    return {
        totalBudget: trip.totalBudget,
        categories, addCategory,
        selectedCategory, selectCategory,
    }
}
