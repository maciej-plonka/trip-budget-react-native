import {useDispatch, useSelector} from "react-redux";
import {selectBudgetCategoriesByBudgetId, selectWishById} from "../../../store/selectors";
import {deleteWishById, updateWish} from "../../../store/actions/WishActions";
import {Id} from "../../../store";
import {Wish} from "../../../store/models";
import {useMemo} from "react";
import {createWishInitialValues, WishValues} from "../WishValues";

export const useWishEdit = (id: Id, tripId: Id) => {
    const wish = useSelector(selectWishById(id))
    const dispatch = useDispatch()
    const categories = useSelector(selectBudgetCategoriesByBudgetId(wish?.tripId ?? "-1"))
    const initialValues = useMemo(() => createWishInitialValues(categories, wish), []);
    const update = (values: WishValues) => {
        const toUpdate: Wish = {
            id,
            tripId,
            name: values.name,
            comments: values.comments,
            targetValue: values.targetValue,
            budgetCategoryId: values.category?.id,
            image: values.image
        }
        dispatch(updateWish(toUpdate))
    }

    const remove = () => dispatch(deleteWishById(id));

    return {
        update, remove, initialValues, categories, exists: !!wish
    }
}
