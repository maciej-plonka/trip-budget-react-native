import React from "react";
import {BudgetCategory} from "../../../../store/models";
import {Select} from "../Select";
import {CategorySelectProps} from "./CategorySelectProps";

export const CategorySelect = (props: CategorySelectProps) => {
    const {values, value, onChanged, unselectedLabel = "Essentials"} = props
    return (
        <Select<BudgetCategory>
            value={value}
            onChanged={onChanged}
            values={values}
            unselectedKey={"-1"}
            labelExtractor={it => it.name}
            unselectedLabel={unselectedLabel}
        />
    )
}
