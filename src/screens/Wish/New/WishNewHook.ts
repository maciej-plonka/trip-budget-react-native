import {useDispatch, useSelector} from "react-redux";
import {Id} from "../../../store";
import {selectBudgetCategoriesByBudgetId, selectBudgetCategoriesByTripId} from "../../../store/selectors";
import {createWish} from "../../../store/actions/WishActions";
import {createWishInitialValues, WishValues} from "../WishValues";
import {NewWish} from "../../../store/models";
import {useMemo} from "react";

export const useWishNew = (tripId: Id) => {
    const categories = useSelector(selectBudgetCategoriesByTripId(tripId))
    const initialValues = useMemo(() => createWishInitialValues(categories), []);
    const dispatch = useDispatch()
    const create = (values: WishValues) => {
        const newWish :NewWish = {
            tripId,
            name: values.name,
            comments: values.comments,
            targetValue: values.targetValue,
            budgetCategoryId: values.category?.id,
            image: values.image,

        }
        dispatch(createWish(newWish))
    }
    return {
        categories,
        initialValues,
        create,
    }
}
