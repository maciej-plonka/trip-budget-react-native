import React, {useState} from "react";
import {Budget} from "../../../../store/states";
import {FormAddButton, FormButtonRow, FormCard, FormMoneyInput, FormUpdateButton} from "../../../../components/Form";
import {updateBudget} from "../../../../store/actions";
import {useDispatch} from "react-redux";
import {Money} from "../../../../models/Money";

type Props = {
    budget: Budget,
    onUpdate: () => void,
    onCreateCategory: () => void,
}
export const BudgetEditCard = ({budget, onCreateCategory, onUpdate}: Props) => {
    const dispatch = useDispatch()
    const [totalBudget, setTotalBudget] = useState<Money>({...budget.totalBudget})
    const handleUpdateBudget = async () => {
        const budgetToUpdate: Budget = { ...budget,totalBudget}
        dispatch(updateBudget(budgetToUpdate))
        onUpdate()
    }
    return (
        <FormCard>
            <FormMoneyInput label={"Budget"} value={totalBudget} onChanged={setTotalBudget}/>
            <FormButtonRow right>
                <FormAddButton onClick={onCreateCategory}/>
                <FormUpdateButton onClick={handleUpdateBudget}/>
            </FormButtonRow>
        </FormCard>
    )
}
